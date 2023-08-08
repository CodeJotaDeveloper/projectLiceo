import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"
import DataTable from 'react-data-table-component';
import { Context } from '../../../Context/Context';
import 'styled-components'
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print'
import { FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './List.css'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula'

export const ListPrematricula = () => {
    const [dataPrema, setdataPrema] = useState([])
    const [search, setSearch] = useState([])
    const [filter, setFilter] = useState('')
    const { user } = useContext(Context)

    const printPDF = useRef()

    const [selectRow, setSelectRow] = useState([])


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(url,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                })

            setdataPrema(res.data.data)
            setSearch(res.data.data)
        }
        getData()
    }, [])

    const handleChange = (state) => {

        setSelectRow(state.selectRow);

    }

    const handleFilter = (e) => {
        if (e.target.value === '') {
            setdataPrema(search)
        } else {
            const filterResult = search.filter(item => item.NameStudent.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Cedula_Student.toString().toLowerCase().includes(e.target.value)
                || item.Period.toLowerCase().includes(e.target.value.toLowerCase())
                || item.status.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Primer_Apellido_Student.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Institucion_Procedencia_Student.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Cedula_Legal_Manager.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Primer_Apellido_Legal_Manager.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Number_Phone_Legal_Manager.toLowerCase().includes(e.target.value.toLowerCase())
                || item.Email_Legal_Manager.toLowerCase().includes(e.target.value.toLowerCase())
            )
            setdataPrema(filterResult)
        }
        setFilter(e.target.value)
    }

    const generatePDF = useReactToPrint({
        content: () => printPDF.current,
        documentTitle: "ListaPrematricula",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    const columns = [
        {
            name: "Acción",
            selector: row => <Link to={`/listedit/${row._id}`} ><button className="btnEdit"> <FiEdit3 /></button></Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Periodo",
            selector: row => row.Period,
            sortable: true
        },
        {
            name: "Estado",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Cédula Alumno",
            selector: row => row.Cedula_Student,
            sortable: true
        },
        {
            name: "Cédula Frotal",
            selector: row => <img width={50} height={50} src={row.cedStudentPhotoFrontal} />
        },
        {
            name: "Cédula Dorsal",
            selector: row => <img width={50} height={50} src={row.cedStudentPhotoDorsal} />
        },
        {
            name: "Nombre Alumno",
            selector: row => row.NameStudent,
            sortable: true
        },
        {
            name: "Primer Apellido Alumno",
            selector: row => row.Primer_Apellido_Student,
            sortable: true
        },
        {
            name: "Segundo Apellido Alumno",
            selector: row => row.Segundo_Apellido_Student,
            sortable: true
        },

        {
            name: "Institución",
            selector: row => row.Institucion_Procedencia_Student,
            sortable: true
        },
        {
            name: "Cédula Encargado",
            selector: row => row.Cedula_Legal_Manager,
            sortable: true
        },
        {
            name: "Cédula Frontal",
            selector: row => <img width={50} height={50} src={row.cedManagerPhotoFrontal} />
        },
        {
            name: "Cédula Dorsal",
            selector: row => <img width={50} height={50} src={row.cedManagerPhotoDorsal} />
        },
        {
            name: "Nombre Encargado",
            selector: row => row.Name_Legal_Manager,
            sortable: true
        },
        {
            name: "Primer Apellido Encargado",
            selector: row => row.Primer_Apellido_Legal_Manager,
            sortable: true
        },
        {
            name: "Segundo Apellido Encargado",
            selector: row => row.Segundo_Apellido_Legal_Manager,
            sortable: true
        },
        {
            name: "Teléfono Encargado",
            selector: row => row.Number_Phone_Legal_Manager,
            sortable: true
        },
        {
            name: "Email Encargado",
            selector: row => row.Email_Legal_Manager,
            sortable: true
        },
        {
            name: "Recibo Dirección",
            selector: row => <img width={50} height={50} src={row.reciboDireccion} />
        },
        {
            name: "Poliza",
            selector: row => <img width={50} height={50} src={row.poliza} />
        },
        {
            name: "Motivo",
            selector: row => row.motivo,
            sortable: true
        },

    ]

    return (
        <div className='boxTable'>
            <h1 className="textTable">Listas de Solictudes de Prematricula</h1>
            <div className="boxButtons">
                <input className="filter" placeholder="Buscar...." value={filter} onInput={(e) => handleFilter(e)} />
                <CSVLink data={dataPrema} filename="Solicitudes" > <button className="buttonTable">Generar Excel</button> </CSVLink>
                <button className="buttonTable" onClick={generatePDF}>Generar PDF</button>
            </div>
            <div ref={printPDF} style={{ width: '100%' }}>
                <DataTable
                    columns={columns}
                    data={dataPrema}
                    fixedHeaderScrollHeight
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    selectableRowsHighlight
                    highlightOnHover
                ></DataTable>
            </div>
        </div>
    )

}