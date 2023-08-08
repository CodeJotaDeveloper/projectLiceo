import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";
import { Context } from '../../../Context/Context'
import { useReactToPrint } from 'react-to-print'
import './voucher.css'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula/voucherprematriculaestudiante/'
const urlPrematricula = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula/'

//http://localhost:4600/api/prematricula/

export const Voucher = () => {
    const location = useLocation()
    const cedulaEstudiante = location.pathname.split('/voucher/')

    const path = cedulaEstudiante[1];


    const printPDF = useRef()



    const [datapre, setDataPre] = useState([])
    const [Cedula_Student, setCedula_Student] = useState("")
    const [NameStudent, setName_Student] = useState("")
    const [Primer_Apellido_Student, setPrimer_Apellido_Student] = useState("")
    const [Segundo_Apellido_Student, setSegundo_Apellido_Student] = useState("")
    const [fecha_nacimiento_iso, setFecha_nacimiento] = useState("")
    const [Institucion_Procedencia_Student, setInstitucion_Procedencia_Student] = useState("")

    const [Cedula_Legal_Manager, setCedula_Legal_Manager] = useState("")
    const [Name_Legal_Manager, setName_Legal_Manager] = useState("")
    const [Primer_Apellido_Legal_Manager, setPrimer_Apellido_Legal_Manager] = useState("")
    const [Segundo_Apellido_Legal_Manager, setSegundo_Apellido_Legal_Manager] = useState("")
    const [Number_Phone_Legal_Manager, setNumber_Phone_Legal_Manager] = useState("")
    const [Email_Legal_Manager, set_Email_Legal_Manager] = useState("")
    const [Address_Legal_Manager, setAddress_Legal_Manager] = useState("")

    const [update, setUpdate] = useState(false);

    useEffect(() => {

        const showData = async () => {


            const res = await axios.get(url + path,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            );


            setDataPre(res.data.data);

            setCedula_Student(datapre[0].Cedula_Student);
            setName_Student(datapre[0].NameStudent)
            setPrimer_Apellido_Student(datapre[0].Primer_Apellido_Student)
            setSegundo_Apellido_Student(datapre[0].Segundo_Apellido_Student)
            //setFecha_nacimiento(res.data.data[0].fecha_nacimiento_iso)
            setInstitucion_Procedencia_Student(datapre[0].Institucion_Procedencia_Student)
            setCedula_Legal_Manager(datapre[0].Cedula_Legal_Manager)
            setName_Legal_Manager(datapre[0].Name_Legal_Manager)
            setPrimer_Apellido_Legal_Manager(datapre[0].Primer_Apellido_Legal_Manager)
            setSegundo_Apellido_Legal_Manager(datapre[0].Segundo_Apellido_Legal_Manager)
            setNumber_Phone_Legal_Manager(datapre[0].Number_Phone_Legal_Manager)
            set_Email_Legal_Manager(datapre[0].Email_Legal_Manager)
            setAddress_Legal_Manager(datapre[0].Address_Legal_Manager)
        }
        showData();
    }, [path]);

    const { user } = useContext(Context);

    const generatePDF = useReactToPrint({
        content: () => printPDF.current,
        documentTitle: "Prematricula",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    const handleUpdate = async () => {
        try {
            await axios.put(urlPrematricula + datapre._id, {
                username: user.username, Cedula_Student, NameStudent,
                Primer_Apellido_Student, Segundo_Apellido_Student, fecha_nacimiento_iso, Institucion_Procedencia_Student, Cedula_Legal_Manager,
                Name_Legal_Manager, Primer_Apellido_Legal_Manager, Segundo_Apellido_Legal_Manager, Number_Phone_Legal_Manager, Email_Legal_Manager,
                Address_Legal_Manager
            },
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            window.location.reload()
        } catch (error) { }
    }


    return (
        <>
            <div ref={printPDF} style={{ width: '100%' }} className="contentVoucher">
                <div className="headerLiceo">
                    {/*  <img className="logoComp" src={logo} alt='logo del liceo' /> */}
                    <div className="boxInformation">
                        <p className="textVoucher">Liceo La Virgen</p>
                        <p className="textVoucher">Teléfono: 2459-1100 ext. 68112</p>
                        <p className="textVoucher">Periodo: {datapre[0]?.Period}</p>
                        <p className="textVoucher">Fecha: {new Date(datapre[0]?.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <h1 className="titleVoucher">Comprobante de Prematricula</h1>
                <p className="titleVoucherD"> <b>Datos del Estudiante</b></p>

                <div className="boxVoucher">
                    <div className="columVoucher">
                        {update ? <input type='text' placeholder="Cédula" className='updateTex' value={Cedula_Student} onChange={(event) => setCedula_Student(event.target.value)} /> : <p className="textComp"> <b>Cédula:</b> {datapre[0].Cedula_Student}</p>}
                        {update ? <input type='text' placeholder="Nombre" className='updateTex' value={NameStudent} onChange={(event) => setName_Student(event.target.value)} /> : <p className="textComp"> <b>Nombre: </b>{datapre[0].NameStudent}</p>}
                        {update ? <input type='text' placeholder="Primer Apellido" className='updateTex' value={Primer_Apellido_Student} onChange={(event) => setPrimer_Apellido_Student(event.target.value)} /> : <p className="textComp"> <b>Primer Apellido:</b> {datapre[0].Primer_Apellido_Student}</p>}

                    </div>
                    <div className="columVoucher">
                        {update ? <input type='text' className='updateTex' value={Segundo_Apellido_Student} onChange={(event) => setSegundo_Apellido_Student(event.target.value)} /> : <p className="textComp"> <b>Segundo Apellido:</b> {datapre[0].Segundo_Apellido_Student}</p>}
                        {update ? <input type='text' className='updateTex' value={fecha_nacimiento_iso} onChange={(event) => setFecha_nacimiento(event.target.value)} /> : <p className="textComp"> <b>Fecha Estudiante:</b> {datapre[0].fecha_nacimiento_iso}</p>}
                        {update ?
                            <select className="listOptions" value={Institucion_Procedencia_Student} name="Institucion_Procedencia_Student" onChange={(event) => setInstitucion_Procedencia_Student(event.target.value)}>
                                <option value="Sexto Grado" >Sexto Grado</option>
                                <option value="Estudiante Regular" >Estudiante Regular</option>
                                <option value="Traslado" >Traslado</option>
                            </select>
                            : <p className="textComp"> <b>Institución:</b> {datapre[0].Institucion_Procedencia_Student}</p>}
                    </div>
                </div>
                <p className="titleVoucherD"> <b>Datos del Encargado</b></p>
                <div className="boxVoucher">
                    <div className="columVoucher">
                        {update ? <input type='text' className='updateTex' value={Cedula_Legal_Manager} onChange={(event) => setCedula_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Cédula:</b> {datapre[0].Cedula_Legal_Manager}</p>}
                        {update ? <input type='text' className='updateTex' value={Name_Legal_Manager} onChange={(event) => setName_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Nombre: </b>{datapre[0].Name_Legal_Manager}</p>}
                        {update ? <input type='text' className='updateTex' value={Primer_Apellido_Legal_Manager} onChange={(event) => setPrimer_Apellido_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Primer Apellido:</b> {datapre[0].Primer_Apellido_Student}</p>}
                        {update ? <input type='text' className='updateTex' value={Segundo_Apellido_Legal_Manager} onChange={(event) => setSegundo_Apellido_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Segundo Apellido:</b> {datapre[0].Segundo_Apellido_Student}</p>}
                    </div>
                    <div className="columVoucher">
                        {update ? <input type='text' className='updateTex' value={Number_Phone_Legal_Manager} onChange={(event) => setNumber_Phone_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Teléfono:</b> {datapre[0].Number_Phone_Legal_Manager}</p>}
                        {update ? <input type='text' className='updateTex' value={Email_Legal_Manager} onChange={(event) => set_Email_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Correo:</b> {datapre[0].Email_Legal_Manager}</p>}
                        {update ? <input type='text' className='updateTex' value={Address_Legal_Manager} onChange={(event) => setAddress_Legal_Manager(event.target.value)} /> : <p className="textComp"> <b>Dirección:</b> {datapre[0].Address_Legal_Manager}</p>}
                    </div>
                </div>
            </div>
            <div className="ButtonVoucher">
                {datapre[0].username === user?.username && (
                    <div className="btnboxVoucher">
                        <button className="btnVoucher" onClick={() => setUpdate(true)}>Editar</button>
                        {update && (
                            <button className="btnVoucher" onClick={handleUpdate}>Actualizar</button>
                        )}
                        <button className="btnVoucher" onClick={generatePDF}>Imprimir</button>
                    </div>
                )}

            </div>

        </>
    )
}
