import { useState } from 'react';
import Axios from 'axios';
import './Register.css';
import { sweetAlertMensaje } from '../../Mensajeria/Mensajeria';
import { textoTieneEspaciosVacio, textoEmailTieneEspaciosVacio } from '../../Mensajeria/validacion';
import { useHistory } from 'react-router-dom';


const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/auth/signup'


const Register = () => {

  const [username, setUsername] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const guardarRegistro = async (e) => {
    let vacio = false;
    e.preventDefault();

    vacio = textoEmailTieneEspaciosVacio(email);
    vacio = textoTieneEspaciosVacio(username);
    if (!vacio) textoTieneEspaciosVacio(cedula);
    if (!vacio) textoTieneEspaciosVacio(password);
    if (vacio) {
      sweetAlertMensaje('Advertencia', 'Todos los campos son requeridos', 'info')

    } else {
      try {
        const res = await Axios.post(url, {
          username,
          cedula,
          email,
          password
        });
        sweetAlertMensaje('Exito', "Se pudo registrar", 'success');
        history.push('/');
      } catch (error) {
        sweetAlertMensaje('Error', 'Todos los campos son requeridos', 'error');
      }
    }
  };

  return (
    <form className='formRegistre'>
      <div className='container'>
        <div className='registre-box'>
          <h2 className='RegistreTEXT'>Crear una cuenta</h2>
          <label className='textLabel'>Nombre</label>
          <input className='textRegistre'
            type='text'
            placeholder='Nombre'
            onChange={(event) => { setUsername(event.target.value); }}
          />
          <label className='textLabel'>Cédula</label>
          <input className='textRegistre'
            type='text'
            placeholder='Cédula'
            onChange={(event) => { setCedula(event.target.value); }}
          />
          <label className='textLabel'>Correo</label>
          <input className='textRegistre'
            type='email' required
            placeholder='Correo'
            onChange={(event) => { setEmail(event.target.value); }}
          />
          <label className='textLabel'>Contraseña</label>
          <input className='textRegistre'
            type='password'
            placeholder='Contraseña'
            onChange={(event) => { setPassword(event.target.value); }}
          />
          <button className='button-registre' onClick={guardarRegistro} >Enviar</button>

        </div>
      </div>

    </form>

  )
}

export default Register