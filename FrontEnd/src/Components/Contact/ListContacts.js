import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"
import { Context } from '../../Context/Context';
import { useParams } from "react-router-dom";
import './listContacts.css';
import 'styled-components'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print'
import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/estado'
const urlget = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/contacts'

export const ListContacts = () => {
    const [dataPrema, setdataPrema] = useState([])
    const [search, setSearch] = useState([])
    const [filter, setFilter] = useState('')
    const { id } = useParams()
    const { user } = useContext(Context)

    const printPDF = useRef()




    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(urlget,
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




    const columns = [
        {
            name: "Actualizar",
            selector: row => <Link to={`/status/${row._id}`}> <button> <BiEdit /> </button> </Link>

        },
        {
            name: "Estados",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Solicitud",
            selector: row => row.request,
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => new Date(row.createdAt).toLocaleDateString()
        },
        {
            name: "Cédula",
            selector: row => row.cedula
        },
        {
            name: "Nombre",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Primer Apellido",
            selector: row => row.primerApellido,
            sortable: true
        },
        {
            name: "Segundo Apellido",
            selector: row => row.segundoApellido,
            sortable: true
        },
        {
            name: "Correo",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Teléfono",
            selector: row => row.phone,
            sortable: true
        },
        {
            name: "Motivo",
            selector: row => row.motivo,
            sortable: true
        }
    ]

    const handleFilter = (e) => {
        if (e.target.value === '') {
            setdataPrema(search)
        } else {
            const filterResult = search.filter(
                item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.cedula.toLowerCase().includes(e.target.value.toLowerCase())
                    || item.createdAt.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.request.toLowerCase().includes(e.target.value.toLowerCase()))
            setdataPrema(filterResult)
        }
        setFilter(e.target.value)
    }

    const generatePDF = useReactToPrint({
        content: () => printPDF.current,
        documentTitle: "ListasSolicitudes",
        onAfterPrint: () => alert("Data saved in PDF")
    });



    return (
        <div className='boxTable'>
            <h1 className="textTable">Listas de Solicitudes</h1>
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
                ></DataTable>
            </div>
        </div>
    )

}