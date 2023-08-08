import { useState, useContext } from "react";
import Axios from 'axios'
import { Context } from "../../Context/Context";
import { useHistory } from 'react-router-dom';
import { sweetAlertMensaje } from '../Mensajeria/Mensajeria';
import './control.css'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula/estudiante/'
const urlTeacher = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/teacherattendance'

export const Control = () => {
    const [NameStudent, setName_Student] = useState("")
    const [Primer_Apellido_Student, setPrimer_Apellido_Student] = useState("")
    const [Segundo_Apellido_Student, setSegundo_Apellido_Student] = useState("")
    const [fecha, setFecha] = useState("")
    const [Cedula_Student, setCedula_Student] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [emailLegalManager, setEmailLegalManager] = useState("")

    const [subject, setSubject] = useState("")
    const [absence, setAbsence] = useState("")
    const { user } = useContext(Context)

    let history = useHistory();
    //Pruebas para autollenado de datos.
    const buscandoPrematricula = async (e) => {
        e.preventDefault();

        try {
            const res = await Axios.get(url + Cedula_Student, {
                headers: {
                    'x-access-token': `${user.token}`
                }
            });
            console.log(res.data.data);
            setName_Student(res.data.data[0].NameStudent);
            setPrimer_Apellido_Student(res.data.data[0].Primer_Apellido_Student);
            setSegundo_Apellido_Student(res.data.data[0].Segundo_Apellido_Student);
            setEmailLegalManager(res.data.data[0].Email_Legal_Manager);
            sweetAlertMensaje('Éxito', 'Se encontró el usuario.', 'success');
        } catch (error) {
            sweetAlertMensaje('Advertencía', 'La cédula ingresada del estudiante no existe.', 'info');
        }
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post(urlTeacher,
                {
                    Cedula_Student,
                    NameStudent,
                    Primer_Apellido_Student,
                    Segundo_Apellido_Student,
                    fecha,
                    subject,
                    absence,
                    cantidad,
                    emailTeacher: user?.email,
                    emailLegalManager
                }, {
                headers: {
                    'x-access-token': `${user.token}`
                }
            });

            if (res.data.error === true) {//campos enviados mal validar
                sweetAlertMensaje('Advertencia', res.data.mensaje, 'info');
            } else {//todo salio bien exitos
                sweetAlertMensaje('Exito', res.data.mensaje, 'success');
                history.push('/');
            }
        } catch (error) {
            sweetAlertMensaje('Error dato incorrecto', 'No se completó los campos de la asistencia', 'error');
            history.push('/control')
        }
    }
    return (
        <div className="contentAbsence">
            <h1 className="titleAbsence">Control de Asistencia</h1>
            <form className="fromAbsence">
                <div className="boxConsult">
                    <div className="elements">
                        <label className="textAbsence">Digite el número de cédula</label>
                        <input className='dataAbsence' type="text" onChange={(event) => { setCedula_Student(event.target.value); }} />
                        <button className='btnControl' onClick={buscandoPrematricula}>Consultar</button>
                    </div>
                </div>
                <div className="boxDtConsult">

                    <label className="textAbsence">Nombre</label>
                    <input className='dataAbsence' type="text"
                        onChange={(event) => { setName_Student(event.target.value); }} value={NameStudent} placeholder='Nombre Estudiante' readOnly
                    />
                    <label className="textAbsence">Primer Apellido</label>
                    <input className='dataAbsence' type="text"
                        onChange={(event) => { setPrimer_Apellido_Student(event.target.value); }} value={Primer_Apellido_Student} placeholder='Primer Apellido' readOnly
                    />
                    <label className="textAbsence">Segundo Apellido</label>
                    <input className='dataAbsence' type="text"
                        onChange={(event) => { setSegundo_Apellido_Student(event.target.value); }} value={Segundo_Apellido_Student} placeholder='Segundo Apellido' readOnly
                    />
                    <label className="textAbsence">Fecha</label>
                    <input className='dataAbsence' type="text"
                        onChange={(event) => { setFecha(event.target.value); }} placeholder='Fecha'
                    />
                    <label className="textAbsence" >Correo del Profesor</label>
                    <input className='emailAbsence' type="text"
                        value={user?.email} placeholder='Email del Profesor' readOnly
                    />
                    <label className="textAbsence">Correo del Encargado Legal</label>
                    <input className='emailAbsence' type="text"
                        onChange={(event) => { setEmailLegalManager(event.target.value); }} value={emailLegalManager} placeholder='Email del Encargado Legal' readOnly
                    />

                    <div className="boxSelect">
                        <div className="boxAbsence">
                            <label className='labelTexts'>Materias</label>
                            <select className="listOptions" name="grado" onChange={(event) => { setSubject(event.target.value); }}>
                                <option >Elige</option>
                                <option value="Español" >Español</option>
                                <option value="Estudios Sociales" >Estudios Sociales</option>
                                <option value="Ciencias" >Ciencias</option>
                                <option value="Civica" >Cívica</option>
                                <option value="Informática" >Informática</option>
                                <option value="Matemáticas" >Matemáticas</option>
                                <option value="Fortalecimiento Matemáticas" >Fortalecimiento Matemáticas</option>
                                <option value="Inglés Académico" >Inglés Académico</option>
                                <option value="Ingles Conversacional" >Inglés Conversacional</option>
                                <option value="Frances" >Francés</option>
                                <option value="Biologia" >Biología</option>
                                <option value="Quimica" >Química</option>
                                <option value="Fisica" >Física</option>
                                <option value="Filosofia" >Filosofía</option>
                                <option value="Religión" >Religión</option>
                                <option value="Musica" >Música</option>
                                <option value="Orientación" >Orientación</option>
                                <option value="EdFisica" >Educación Física</option>
                                <option value="Artes Plásticas" >Artes Plásticas</option>
                                <option value="Afectividad" >Afectividad</option>
                                <option value="Psicología" >Psicología</option>
                                <option value="Club" >Club</option>
                                <option value="Hogar" >Hogar</option>
                                <option value="Industrial" >Industrial</option>
                                <option value="Guia" >Guía</option>
                            </select>
                        </div>
                        <div className="boxAbsence">
                            <label className='labelTexts'>Tipo de Asistencia</label>
                            <select className="listOptions" name="grado" onChange={(event) => { setAbsence(event.target.value); }}>
                                <option >Elije</option>
                                <option value="Ausencia Justificada" >Ausencia Justificada</option>
                                <option value="Ausencia Injustificada" >Ausencia Injustificada</option>
                                <option value="Tardia Justificada" >Tardía Justificada</option>
                                <option value="Tardia Injustificada" >Tardía Injustificada</option>
                                <option value="Presente" >Presente</option>
                            </select>
                        </div>
                    </div>
                    <label className="textAbsence">Cantidad de Ausencias</label>
                    <input className='dataAbsence' type="text"
                        onChange={(event) => { setCantidad(event.target.value); }} placeholder='Cantidad de ausencias'
                    />
                    <div className='boxbtnControl'>
                        <button className='btnControl' onClick={handleSumbit}>Enviar</button>
                    </div>
                </div>
            </form>


        </div>
    )
}
