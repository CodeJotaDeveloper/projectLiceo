import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"
import { Context as SessionContext } from "../../../Context/Context"
import axios from 'axios'
import { sweetAlertMensaje } from '../../Mensajeria/Mensajeria';

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/auth/signin'

const Login = () => {
  const emailRef = useRef()
  const passRef = useRef()
  let { dispatch, FetchData } = useContext(SessionContext)


  let history = useHistory();


  const handleSubmit = async (e) => {
    var bandera = false;
    let vacio = false;

    e.preventDefault();
    dispatch({ type: "LOGINSTART" })
    let res;
    if (!emailRef.current.value) vacio = true;
    if (!passRef.current.value) vacio = true;
    if (vacio) {
      sweetAlertMensaje('Advertencía', 'Todos los campos son requiridos', 'info');
    } else {
      try {
        res = await axios.post(url, {
          email: emailRef.current.value,
          password: passRef.current.value,
        })



        const rol = res.data.data.roles;

        if (Object.entries(rol).length === 0) {
          bandera = false;
          sweetAlertMensaje('Contacte con el Supervisor', 'El usuario ingresado no tiene roles para acceder.', 'info');
          dispatch({ type: "LOGOUT" })
          history.push('/');
        } else {
          dispatch({ type: "LOGINSUCCESS", payload: res.data.data })
          bandera = true;
        }

      } catch (error) {

        //  console.log({ res });
        bandera = false;
        sweetAlertMensaje('Error al ingresar', "Usuario o contraseña incorrecta", 'error');
        dispatch({ type: "LOGINFAILED" })
      }

      if (bandera) {
        sweetAlertMensaje("Ha iniciado sesion de forma correcta", "Bienvenido", 'success');
        history.push('/')
      }
    }

  }

  return (
    <div>
      <form className='formRegistre' onSubmit={handleSubmit}>
        <div className='container'>
          <div className='registre-box'>
            <h2 className='RegistreTEXT'>Iniciar Sesión</h2>
            <label className='textLabel'>Correo</label>
            <input className='textRegistre'
              type='text'
              placeholder='Correo'
              required ref={emailRef}
            />
            <label className='textLabel'>Contraseña</label>
            <input className='textRegistre'
              type='password'
              placeholder='Contraseña'
              required ref={passRef}
            />
            <button className='button-registre' type='submit' disabled={FetchData}>
              Ingresar
            </button>
            <p className='linkpassword'>¿Olvidaste tu contraseña? <Link to='/forgotPassword'><span>Recuperarla</span></Link></p>
          </div>
        </div>
      </form>
    </div>
  )

};



export default Login