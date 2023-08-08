import { useState, useContext, useEffect } from "react"
import { Context } from "../../Context/Context"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import "./account.css"

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/users/'
const urlUpdateUser = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/user/'



export const Account = () => {
  const { user, dispatch } = useContext(Context)


  const [file, setFile] = useState(null)
  const [datos, setdatos] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [succes, setSucces] = useState(false)


  const mensaje = () => {
    Swal.fire({
      title: 'El perfil ha sido actualizado',
      timer: 5000,
      confirmButtonText: 'Aceptar'
    })
  }
  let history = useHistory();

  useEffect(() => {
    const Data = async () => {
      try {
        const res = await axios.get(url)
        setdatos(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    Data()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: "UPDATE_PASSWORD_START" })
    const updateUser = {
      userId: user._id,
      username, email, password,

    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      updateUser.profile = filename

    } try {
      const res = await axios.put(urlUpdateUser + user._id, updateUser,
        {
          headers: {
            'x-access-token': `${user.token}`
          }
        }
      )
      console.log('Usuario account' + user.username)
      mensaje();
      dispatch({ type: "LOGOUT" })
      history.push('/')

      res.data.dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "UPDATE_PASSWORD_FAILED" })
    }
  }

  return (
    <div className="boxAccount">
      <h1 className="titleAccount"> Actualizar su cuenta</h1>
      <form className="formAccount" onSubmit={handleSubmit}>
        <div className="boxInfo">
          <label className="textlabel" htmlFor=''>Usuario</label>
          <input className="textInput" type='text' value={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label className="textlabel" htmlFor='' >Correo</label>
          <input className="textInput" type='email' value={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label className="textlabel" htmlFor=''>Contraseña</label>
          <input className="textInput" type='password' onChange={(e) => setPassword(e.target.value)} />

        </div>

        <button className='buttonAccount'>Actualizar</button>
        {succes && <span>Perfil ha sido actualizado</span>}
      </form>
    </div>
  )
}