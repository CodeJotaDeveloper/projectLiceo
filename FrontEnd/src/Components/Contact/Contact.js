import { useState } from "react";
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import { sweetAlertMensaje } from '../Mensajeria/Mensajeria'
import './Contact.css';

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/contacts'

const Contact = () => {

    const [name, setName] = useState("")
    const [primerApellido, setPrimerApellido] = useState("")
    const [segundoApellido, setSegundoApellido] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [cedula, setCedula] = useState("")
    const [request, setRequest] = useState("");

    function changeRequest(e) {
        e.preventDefault();
        setRequest(e.target.value);
    }

    let history = useHistory();

    const guardarContacto = async (e) => {
        e.preventDefault();
        let res;

        try {
            res = await Axios.post(url, {
                name,
                primerApellido,
                segundoApellido,
                email,
                phone,
                cedula,
                request
            });

            if (res.data.error === true) {//campos enviados mal validar
                sweetAlertMensaje('Advertencia', res.data.mensaje, 'info');
            } else {//todo salio bien exitos
                sweetAlertMensaje('Exito', res.data.mensaje, 'success');
                history.push('/');
            }

        } catch (error) {
            sweetAlertMensaje('Error en campos', 'Todos los campos son requeridos', 'error');
        }


    };

    return (
        <form className='formContact'>

            <div className="container">
                <div className='registre-box'>
                    <h2 className="secondTitle">Formulario del Contacto</h2>
                    <div>
                        <label className="labelContact">Cédula</label>
                        <input className="textContact" placeholder='Cédula' type="text" value={cedula} onChange={(event) => { setCedula(event.target.value); }}

                        />
                    </div>
                    <div>
                        <label className="labelContact">Nombre</label>
                        <input className="textContact" placeholder='Nombre' type="text" value={name} onChange={(event) => { setName(event.target.value); }}

                        />
                    </div>
                    <div>
                        <label className="labelContact">Primer Apellido</label>
                        <input className="textContact" placeholder='Primer Apellido' type="text" onChange={(event) => { setPrimerApellido(event.target.value); }}

                        />
                    </div>
                    <div>
                        <label className="labelContact">Segundo Apellido</label>
                        <input className="textContact" placeholder='Segundo Apellido' type="text" onChange={(event) => { setSegundoApellido(event.target.value); }}

                        />
                    </div>
                    <div>
                        <label className="labelContact">Correo Electrónico</label>
                        <input className="textContact" placeholder='Correo' type="email" onChange={(event) => { setEmail(event.target.value); }} />
                    </div>
                    <div>
                        <label className="labelContact">Teléfono</label>
                        <input className="textContact" placeholder='Teléfono' type="text" onChange={(event) => { setPhone(event.target.value); }}

                        />
                    </div>

                    <div>
                        <label className="labelContact">Trámite</label>
                        <p><select name='Requests' value={request} onChange={changeRequest} className='textRegistre' >
                            <option>Seleccione su solicitud</option>
                            <option>Certificado de Notas</option>
                            <option>Constancia</option>
                            <option>Reposición de título</option>
                            <option>Traslado</option>

                        </select></p>

                    </div>

                    <div>
                        <button className="button-contact" onClick={guardarContacto}>Guardar</button>
                    </div>

                </div>
            </div>

        </form>
    )

}

export default Contact