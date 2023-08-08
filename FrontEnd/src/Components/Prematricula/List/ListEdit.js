import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../../../Context/Context"
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";

import './edit.css'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/prematricula/'

export const ListEdit = () => {
  let history = useHistory()
  const { id } = useParams();
  const { user } = useContext(Context)
  const location = useLocation()
  const path = location.pathname.split("/")[2]

  const [prematricula, setPrematricula] = useState({
    Cedula_Student: "",
    NameStudent: "",
    Primer_Apellido_Student: "",
    Segundo_Apellido_Student: "",
    Institucion_Procedencia_Student: "",
    Cedula_Legal_Manager: "",
    Name_Legal_Manager: "",
    Primer_Apellido_Legal_Manager: "",
    Segundo_Apellido_Legal_Manager: "",
    Number_Phone_Legal_Manager: "",
    Email_Legal_Manager: "",
    status: "",
    motivo: "",

  })


  useEffect(() => {
    const show = async () => {
      const { data } = await axios.get(`${url}${id}`,
        {
          headers: {
            'x-access-token': `${user.token}`
          }
        }
      );
      setPrematricula(data.data)
    }
    show()
  }, [])

  const handleChange = (e) => {
    const premClone = { ...prematricula };
    premClone[e.target.name] = e.target.value
    setPrematricula(premClone)
  }

  const handlSumbit = async (e) => {
    e.preventDefault();
    axios.put(url + id, prematricula,
      {
        headers: {
          'x-access-token': `${user.token}`
        }
      }
    )
    history.push("/listPrematricula")
  }


  const eliminar = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(url + id,
        {
          headers: {
            'x-access-token': `${user.token}`
          }
        }
      )
      //  history.push('/listPrematricula')
      window.location.replace("/listPrematricula")// Para eviar que usuario intente devolverse al contenido que elimino.

    } catch (error) {

    }

  }


  return (
    <div className='formEdit'>
      <h1 className='textFormsPre'>Editar la Prematricula</h1>
      <form className="formStudent">
        <h2 className='textdate'>Datos del estudiante</h2>
        <input type='text'
          className='dateStudent'
          placeholder='Cedula'
          name='Cedula_Student'
          value={prematricula.Cedula_Student}
          onChange={handleChange}
        />
        <input type='text'
          className='dateStudent'
          placeholder='Nombre'
          name='NameStudent'
          value={prematricula.NameStudent}
          onChange={handleChange}
        />

        <input type='text'
          className='dateStudent'
          placeholder='Apellido 1'
          name='Primer_Apellido_Student'
          value={prematricula.Primer_Apellido_Student}
          onChange={handleChange}
        />
        <input type='text'
          className='dateStudent'
          placeholder='Apellido 2'
          name='Segundo_Apellido_Student'
          value={prematricula.Segundo_Apellido_Student}
          onChange={handleChange}
        />
        <label className='labelTexts'>Institución Procedencia</label>
        <select className="listOptions" value={prematricula.Institucion_Procedencia_Student} name="Institucion_Procedencia_Student" onChange={handleChange}>
          <option value="Sexto Grado" >Sexto Grado</option>
          <option value="Estudiante Regular" >Estudiante Regular</option>
          <option value="Traslado" >Traslado</option>
        </select>

        {/* Datos del encargado */}
        <h2 className='textdate'>Datos del Encargado</h2>
        <input type='text'
          className='dateStudent'
          placeholder='Cédula Encargado'
          name='Cedula_Legal_Manager'
          value={prematricula.Cedula_Legal_Manager}
          onChange={handleChange}
        />
        <input type='text'
          className='dateStudent'
          placeholder='Nombre Encargado'
          name='Name_Legal_Manager'
          value={prematricula.Name_Legal_Manager}
          onChange={handleChange}
        />

        <input type='text'
          className='dateStudent'
          placeholder='Primer Apellido'
          name='Primer_Apellido_Legal_Manager'
          value={prematricula.Primer_Apellido_Legal_Manager}
          onChange={handleChange}
        />
        <input type='text'
          className='dateStudent'
          placeholder='Segundo Apellido'
          name='Segundo_Apellido_Legal_Manager'
          value={prematricula.Segundo_Apellido_Legal_Manager}
          onChange={handleChange}
        />
        <input type='text'
          className='dateStudent'
          placeholder='Teléfono Encargado'
          name='Number_Phone_Legal_Manager'
          value={prematricula.Number_Phone_Legal_Manager}
          onChange={handleChange}
        />
        <input type='email'
          className='dateStudent'
          placeholder='Segundo Apellido'
          name='Email_Legal_Manager'
          value={prematricula.Email_Legal_Manager}
          onChange={handleChange}
        />

        <label className='labelTexts'>Actualizar Estados</label>
        <select className="listOptions" name="status" value={prematricula.status} onChange={handleChange}>
          <option >Elija el estado</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Rechazado">Rechazado</option>
        </select>
        <div>
          <textarea type='text'
            className='mapParent'
            maxlength="200"
            placeholder='Motivo de la aprobación o rechazo'
            name="motivo"
            value={prematricula.motivo}
            onChange={handleChange}
          />
        </div>
        <div className='BoxbtnRol'>
          <button className='btnRol' onClick={handlSumbit}>Actualizar</button>
          <button className='btnRol' onClick={eliminar}>Eliminar</button>
        </div>
      </form>
    </div>
  )
}
