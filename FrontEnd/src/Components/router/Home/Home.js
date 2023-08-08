import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PostNew from "../../PublishNew/postnew/Postnew"
import { useLocation, useHistory } from 'react-router-dom';
import PostEvent from '../../PublishEvent/PostEvent/PostEvent';
import PostCirculares from '../../PublishCirculares/PostCirculares/PostCirculares';
import { Context } from "../../../Context/Context"

import Swal from 'sweetalert2'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const urlPost = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/newPost'
const urlEventos = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/eventos'
const urlCirculares = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/circulares'


const Home = () => {

  const [posts, setPosts] = useState([])
  const [postEvent, setpostEvent] = useState([])
  const [circulares, setcirculares] = useState([])
  const { search } = useLocation()
  const { user, dispatch } = useContext(Context)
  let history = useHistory()


  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(urlPost + search)
      setPosts(res.data.data)

    }


    fetchPost()
  }, [search])

  useEffect(() => {
    const fetchPostEvent = async () => {
      const res = await axios.get(urlEventos + search)
      setpostEvent(res.data.data)
    }
    fetchPostEvent()
  }, [search])

  useEffect(() => {
    const fetchPostCircu = async () => {
      const res = await axios.get(urlCirculares + search)
      setcirculares(res.data.data)
    }
    fetchPostCircu()
  }, [search])



  /**
   * Método para cerrar la sesión en caso de que el usuario no presente actividad.
   * Si pasan 10 minutos se cierra la sesión, se puede modificar este periodo de tiempo.
   * 
   */
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    contadorSesion(); //aqui cargamos la funcion de inactividad
  }

  function contadorSesion() {
    if (user) {
      timeout = setTimeout(function () {
        Swal.fire({
          title: '¡Alerta de Inactividad!',
          html: 'Despues de 25 minutos su sesión se cierra de forma automática',
          icon: 'warning',

          didOpen: () => {
            dispatch({ type: "LOGOUT" })
            history.push('/login')
          },
        })
      }, 1200000);//25 minutos se cierrra la sesión si no hay actividad en la cuenta del usuario.     
    }
  }

  function confirmExit() {
    dispatch({ type: "LOGOUT" })
    return 'You have attempted to leave this page. Are you sure?';

  }
  window.onunload = confirmExit;

  return (
    <>
      <div>
        <PostNew posts={posts} />
        <PostEvent postEvent={postEvent} />
        <PostCirculares circulares={circulares} />
      </div>
    </>

  )
}

export default Home