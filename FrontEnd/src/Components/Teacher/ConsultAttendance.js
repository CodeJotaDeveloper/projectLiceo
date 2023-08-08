import { useState, useRef, useContext } from 'react';
import axios from "axios"
import { sweetAlertMensaje } from '../Mensajeria/Mensajeria';
import { useHistory } from 'react-router-dom';
import { Context } from "../../Context/Context";


const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula/voucherprematriculaestudiante/'


export const ConsultAttendance = () => {


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

    const { user } = useContext(Context)

    const consultarVoucherPrematricula = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(url + Cedula_Student,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                });

            setDataPre(res.data.data);
            setCedula_Student(res.data.data[0].Cedula_Student);
            setName_Student(res.data.data[0].NameStudent)
            setPrimer_Apellido_Student(res.data.data[0].Primer_Apellido_Student)
            setSegundo_Apellido_Student(res.data.data[0].Segundo_Apellido_Student)
            setFecha_nacimiento(res.data.data[0].fecha_nacimiento_iso)
            setInstitucion_Procedencia_Student(res.data.data[0].Institucion_Procedencia_Student)
            setCedula_Legal_Manager(res.data.data[0].Cedula_Legal_Manager)
            setName_Legal_Manager(res.data.data[0].Name_Legal_Manager)
            setPrimer_Apellido_Legal_Manager(res.data.data[0].Primer_Apellido_Legal_Manager)
            setSegundo_Apellido_Legal_Manager(res.data.data[0].Segundo_Apellido_Legal_Manager)
            setNumber_Phone_Legal_Manager(res.data.data[0].Number_Phone_Legal_Manager)
            set_Email_Legal_Manager(res.data.data[0].Email_Legal_Manager)
            setAddress_Legal_Manager(res.data.data[0].Address_Legal_Manager)
            sweetAlertMensaje('Éxito', 'Se encontró la prematrícula del estudiante.', 'success');

        } catch (error) {
            sweetAlertMensaje('Error busqueda', 'La cédula ingresada del estudiante no existe.', 'error');
        }
    }


    return (
        <div className="contentConsult">
            <h1 className="titleConsult">Consultas Por Prematricula</h1>
            <div className="ConsultBox">
                <label className="textConsult">Cédula estudiante</label>
                <input className='inputConsult' placeholder='Cédula estudiante'
                    type="text"
                    onChange={(event) => { setCedula_Student(event.target.value); }} required
                />
                <button className="btnConsult" onClick={consultarVoucherPrematricula}>Consultar</button>
            </div>

            <div className="BoxTableConsult">
                <p>Nombre Estudiante: {NameStudent}</p>
                <p>Primer apellido Estudiante: {Primer_Apellido_Student}</p>
                <p>Segundo apellido Estudiante: {Segundo_Apellido_Student}</p>
                <p>Fecha de Nacimiento Estudiante: {fecha_nacimiento_iso}</p>
                <p>Institucion de Procedencia Estudiante: {Institucion_Procedencia_Student}</p>
                <p>Cédula del Estudiante: {Cedula_Student} </p>
                <p>Nombre Encargado Legal: {Name_Legal_Manager}</p>
                <p>Primer Apellido Encargado Legal:: {Primer_Apellido_Legal_Manager}</p>
                <p>Segundo Apellido Encargado Legal: {Segundo_Apellido_Legal_Manager}</p>
                <p>Cédula del Encargado Legal: {Cedula_Legal_Manager} </p>
                <p>Número de teléfono encargado legal: {Number_Phone_Legal_Manager}</p>
                <p>Correo electrónico Encargado Legal: {Email_Legal_Manager}</p>
                <p>Direccion: {Address_Legal_Manager}</p>
            </div>


        </div>
    )
}
