import { useState, useContext } from "react";
import Axios from 'axios'
import { Context } from "../../../Context/Context";
import { useHistory } from 'react-router-dom';
import './FormsPrematricula.css'
import { sweetAlertMensaje } from "../../Mensajeria/Mensajeria";

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula';


const FormsPrematricula = () => {

    const { user } = useContext(Context)

    const [NameStudent, setName_Student] = useState("")
    const [Primer_Apellido_Student, setPrimer_Apellido_Student] = useState("")
    const [Segundo_Apellido_Student, setSegundo_Apellido_Student] = useState("")
    const [fecha_nacimiento_iso, setFecha_nacimiento] = useState("")
    const [Cedula_Student, setCedula_Student] = useState("")
    //Imagenes
    const [imageEstudiantefrontal, setEstudiantefrontal] = useState('');
    const [imageEstudiantedorsal, setEstudiantedorsal] = useState('');
    const [Gender_Student, setGender_Student] = useState("")
    const [Nacionalidad_Student, setNacionalidad_Student] = useState("")
    const [Institucion_Procedencia_Student, setInstitucion_Procedencia_Student] = useState("")

    //Datos del Responsable

    const [Name_Legal_Manager, setName_Legal_Manager] = useState("")
    const [Primer_Apellido_Legal_Manager, setPrimer_Apellido_Legal_Manager] = useState("")
    const [Segundo_Apellido_Legal_Manager, setSegundo_Apellido_Legal_Manager] = useState("")
    const [Number_Phone_Legal_Manager, setNumber_Phone_Legal_Manager] = useState("")
    const [Email_Legal_Manager, set_Email_Legal_Manager] = useState("")
    const [Cedula_Legal_Manager, setCedula_Legal_Manager] = useState("")
    //Imagenes
    const [EncargadoLegalFrontal, setEncargadoLegalFrontal] = useState('')
    const [EncargadoLegalDorsal, setEncargadoLegalDorsal] = useState('')
    const [Ocupacion_Legal_Manager, setOcupacion_Legal_Manager] = useState("")
    const [Gender_Legal_Manager, setGender_Legal_Manager] = useState("")
    const [Nacionalidad_Legal_Manager, setNacionalidad_Legal_Manager] = useState("")
    const [Relationship_Legal_Manager, setRelationship_Legal_Manager] = useState("")
    const [fecha_nacimiento_Legal_Manager_iso, setfecha_nacimiento_Legal_Manager_iso] = useState("")
    const [Address_Legal_Manager, setAddress_Legal_Manager] = useState("")
    // Rebibos
    const [ComprobanteDireccion, setComprobanteDireccion] = useState('')
    const [Poliza, setPoliza] = useState('')

    let history = useHistory()


    const guardarPrematricula = async (e) => {
        var bandera = false;
        e.preventDefault();


        //  if (imageEstudiantefrontal) {//Nombre del archivo en el metodo de la imagen.
        const formData = new FormData();

        formData.append("NameStudent", NameStudent);
        //console.log(formData, 10)
        formData.append("Primer_Apellido_Student", Primer_Apellido_Student);
        formData.append("Segundo_Apellido_Student", Segundo_Apellido_Student);
        formData.append("fecha_nacimiento_iso", fecha_nacimiento_iso);//
        formData.append("Cedula_Student", Cedula_Student);
        //Imagenes
        formData.append("cedStudentPhotoFrontal", imageEstudiantefrontal);
        formData.append("cedStudentPhotoDorsal", imageEstudiantedorsal);


        formData.append("Gender_Student", Gender_Student);
        formData.append("Nacionalidad_Student", Nacionalidad_Student);
        formData.append("Institucion_Procedencia_Student", Institucion_Procedencia_Student);
        //Encargado Legal
        formData.append("Name_Legal_Manager", Name_Legal_Manager);
        formData.append("Primer_Apellido_Legal_Manager", Primer_Apellido_Legal_Manager);
        formData.append("Segundo_Apellido_Legal_Manager", Segundo_Apellido_Legal_Manager);
        formData.append("Number_Phone_Legal_Manager", Number_Phone_Legal_Manager);
        formData.append("Email_Legal_Manager", Email_Legal_Manager);
        formData.append("Cedula_Legal_Manager", Cedula_Legal_Manager);
        //Imagenes
        formData.append("cedManagerPhotoFrontal", EncargadoLegalFrontal);
        formData.append("cedManagerPhotoDorsal", EncargadoLegalDorsal);


        // cedManagerPhotoFrontal , cedManagerPhotoDorsal 
        formData.append("Ocupacion_Legal_Manager", Ocupacion_Legal_Manager);
        formData.append("Gender_Legal_Manager", Gender_Legal_Manager);
        formData.append("Nacionalidad_Legal_Manager", Nacionalidad_Legal_Manager);
        formData.append("Relationship_Legal_Manager", Relationship_Legal_Manager);
        formData.append("Address_Legal_Manager", Address_Legal_Manager);
        formData.append("fecha_nacimiento_Legal_Manager_iso", fecha_nacimiento_Legal_Manager_iso);
        formData.append("username", user.username);

        //Archivos
        formData.append("reciboDireccion", ComprobanteDireccion);
        formData.append("poliza", Poliza);

        try {
            const res = await Axios.post(url, formData, {
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
            sweetAlertMensaje('Error', 'Su matricula no se puede realizar en este momento.', 'error');
        }

    };

    return (
        <div className="containerForms">
            <div className="boxForms">
                <h1 className='textFormsPre'>Formulario de Prematrícula</h1>
                <div className="boxStudent">
                    <form className="formStudent">
                        <h2 className='textdate'>Datos del estudiante</h2>
                        <label className='textLabel'>Nombre</label>
                        <input className='dateStudent' type="text" pattern="^[a-zA-Z ]*$" maxLength="20" onChange={(event) => { setName_Student(event.target.value); }} placeholder='Nombre' />
                        <label className='textLabel'>Primer Apellido</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setPrimer_Apellido_Student(event.target.value); }} placeholder='Primer Apellido' />
                        <label className='textLabel'>Segundo Apellido</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setSegundo_Apellido_Student(event.target.value); }} placeholder='Segundo Apellido' />

                        <label className='labelTexts'>Fecha de nacimiento </label>
                        <input className='dateStudent' type="text" onChange={(event) => { setFecha_nacimiento(event.target.value); }} placeholder='dd/mm/aaaa' />
                        <label className='textLabel'>Cédula</label>
                        <input className='dateStudent' type="text" onChange={(event) => { setCedula_Student(event.target.value); }} placeholder='1-0111-0111' />

                        <div className='boxID'>
                            <label className="textAdd">Adjuntar Cédula Frontal   </label>
                            <input type="file" id='inputfile' onChange={(e) => setEstudiantefrontal(e.target.files[0])} />
                        </div>
                        <div className="'boxID">
                            <label className="textAdd">Adjuntar Cédula Atrás       </label>
                            <input type="file" id='inputfile' onChange={(e) => setEstudiantedorsal(e.target.files[0])} />
                        </div>

                        <div className="boxSelect">
                            <div className="boxdate">
                                <label className='labelTexts'>Género</label>
                                <select name="gender" className="listOptions" onChange={(event) => { setGender_Student(event.target.value); }}>
                                    <option >Elige Género</option>
                                    <option value="Masculino" >Masculino</option>
                                    <option value="Femenino" >Femenino</option>
                                </select>
                            </div>
                            <div className="boxdate">
                                <label className='labelTexts'>Nacionalidad</label>
                                <select className="listOptions" name="nationality" onChange={(event) => { setNacionalidad_Student(event.target.value); }}>
                                    <option >Elige Nacionalidad</option>
                                    <option value="Costarricense" >Costarricense</option>
                                    <option value="Extranjero" >Extranjero</option>
                                </select>
                            </div>
                            <div className="boxdate">
                                <label className='labelTexts'>Institución Procedencia</label>
                                <select className="listOptions" name="grado" onChange={(event) => { setInstitucion_Procedencia_Student(event.target.value); }}>
                                    <option >Elige Procedencia</option>
                                    <option value="Sexto Grado" >Sexto Grado</option>
                                    <option value="Estudiante Regular" >Estudiante Regular</option>
                                    <option value="Traslado" >Traslado</option>
                                </select>

                            </div>
                        </div>

                        <h2 className='textdate'>Datos del responsable</h2>
                        <label className='textLabel'>Nombre</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setName_Legal_Manager(event.target.value); }} placeholder='Nombre' />
                        <label className='textLabel'>Primer Apellido</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setPrimer_Apellido_Legal_Manager(event.target.value); }} placeholder='Primer Apellido' />
                        <label className='textLabel'>Segundo Apellido</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setSegundo_Apellido_Legal_Manager(event.target.value); }} placeholder='Segundo Apellido' />
                        <label className='textLabel'>Teléfono</label>
                        <input className='dateStudent' type="tel" onChange={(event) => { setNumber_Phone_Legal_Manager(event.target.value); }} pattern="^-?[0-9]\d*\.?\d*$" placeholder='Teléfono' />
                        <label className='textLabel'>Correo</label>
                        <input className='dateStudent' type="email" onChange={(event) => { set_Email_Legal_Manager(event.target.value); }} placeholder='Correo electrónico' />
                        <label className='textLabel'>Ocupación</label>
                        <input className='dateStudent' type="text" maxLength="20" onChange={(event) => { setOcupacion_Legal_Manager(event.target.value); }} placeholder='Ocupación' />

                        <label className='labelTexts'>Fecha de nacimiento </label>
                        <input type="text" className='dateStudent' onChange={(event) => { setfecha_nacimiento_Legal_Manager_iso(event.target.value); }} placeholder='dd/mm/aaaa' />
                        <label className='textLabel'>Cédula</label>
                        <input className='dateStudent' type="text" onChange={(event) => { setCedula_Legal_Manager(event.target.value); }} placeholder='1-0111-0111' />

                        <div className='boxID'>
                            <label className="textAdd">Adjuntar Cédula Frontal   </label>
                            <input type="file" id='inputfile' onChange={(e) => setEncargadoLegalFrontal(e.target.files[0])} />

                        </div>
                        <div className="boxID">
                            <label className="textAdd">Adjuntar Cédula Atrás    </label>
                            <input type="file" id='inputfile' onChange={(e) => setEncargadoLegalDorsal(e.target.files[0])} />
                        </div>

                        <div className="boxSelect">
                            <div className="boxdate">
                                <label className='labelTexts'>Género</label>
                                <select className="listOptions" name="gender" onChange={(event) => { setGender_Legal_Manager(event.target.value); }}>
                                    <option >Elige Género</option>
                                    <option value="Masculino" >Masculino</option>
                                    <option value="Femenino" >Femenino</option>
                                </select>
                            </div>
                            <div className="boxdate">
                                <label className='labelTexts'>Nacionalidad</label>
                                <select className="listOptions" onChange={(event) => { setNacionalidad_Legal_Manager(event.target.value); }} >
                                    <option >Elige Nacionalidad</option>
                                    <option value="Costarricense" >Costarricense</option>
                                    <option value="Extranjero" >Extranjero</option>
                                </select>
                            </div>
                            <div className="boxdate">
                                <label className='labelTexts'>Parentesco</label>
                                <select className="listOptions" onChange={(event) => { setRelationship_Legal_Manager(event.target.value); }}>
                                    <option >Elige Procedencia</option>
                                    <option value="Madre" >Madre</option>
                                    <option value="Padre" >Padre</option>
                                    <option value="Encargado Legal" >Encargado Legal</option>
                                </select>
                            </div>
                        </div>

                        <p className="textID">Documentos</p>
                        <div className="boxID">
                            <label className="textAdd">Recibo de Dirección   </label>
                            <input type="file" id='inputfile' onChange={(e) => setComprobanteDireccion(e.target.files[0])} />

                        </div>

                        <div className="boxID">
                            <label className="textAdd">Poliza Estudiantil    </label>
                            <input type="file" id='inputfile' onChange={(e) => setPoliza(e.target.files[0])} />
                        </div>

                        <div>
                            <label className='textLabel'>Dirección Exacta</label>
                            <textarea className='mapParent' maxLength="200" placeholder='Dirección exacta' type='text' onChange={(event) => { setAddress_Legal_Manager(event.target.value); }} name='commentPost' />
                        </div>

                        <div className='buttonpre'>
                            <button className='Presumbit' onClick={guardarPrematricula}  >Guardar</button>
                        </div>

                    </form>
                </div>

            </div >

        </div >
    )
}

export default FormsPrematricula