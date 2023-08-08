import { useState } from "react"
import Axios from "axios"
import { useHistory } from 'react-router-dom'
import { sweetAlertMensaje } from '../../Mensajeria/Mensajeria';
import { textoEmailTieneEspaciosVacio } from '../../Mensajeria/validacion';

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/reset'

export const ForgotPassword = () => {

  const [email, setEmail] = useState([])
  let history = useHistory()

  const guardarEmail = async (e) => {
    let vacio = false;
    e.preventDefault();
    vacio = textoEmailTieneEspaciosVacio(email);
    if (vacio) {
      sweetAlertMensaje('Advertencia', 'El correo es requerido', 'info')

    } else {
      try {
        await Axios.put(url, {
          email
        });
        sweetAlertMensaje('Exito', 'Revise el correo electrónico', 'success')
        history.push('/')
      } catch (error) {
        sweetAlertMensaje('Error', 'No se puede enviar el correo de recuperación', 'error')

      }
    }
  };

  return (
    <div>
      <form className='formRegistre'>
        <div className='container'>
          <div className='registre-box'>
            <h2 className='RegistreTEXT'>Recuperar Contraseña</h2>
            <input className='textRegistre'
              type='email' onChange={(evento) => { setEmail(evento.target.value) }}
              placeholder='Correo'
            />
            <button className='button-registre' type='submit' onClick={guardarEmail}>Restaurar Constraseña</button>
          </div>
        </div>
      </form>
    </div>
  )



}


