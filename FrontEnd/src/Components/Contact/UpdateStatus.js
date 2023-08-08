import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../../Context/Context"
import { useParams, useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";

import './Contact.css'

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/contacts'
const urlDelete = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/contacts/'

//const location = useLocation()


export const UpdateStatus = () => {
    const { id } = useParams();
    const { user } = useContext(Context)

    const [contacts, setContacto] = useState({
        name: "",
        cedula: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        phone: "",
        status: "",
        motivo: "",
    })
    //console.log(contacts);

    const handleChange = (e) => {
        const dato = { ...contacts };
        dato[e.target.name] = e.target.value
        setContacto(dato)
    }


    useEffect(() => {
        const show = async () => {

            const { data } = await axios.get(`${url}/${id}`,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            setContacto(data.data)
        }
        show()
    }, [])


    const actualizar = async (e) => {
        e.preventDefault();
        try {
            await axios.put(url + '/' + id, contacts,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            window.location.replace("/listContacts")// Para eviar que usuario intente devolverse al contenido que elimino.
        } catch (error) {

        }

    }
    const eliminar = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(urlDelete + id,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            window.location.replace("/listContacts")
        } catch (error) {

        }

    }

    return (
        <div className="boxcontacto" >
            <h1 className='textFormsPre'>Actualizar Solicitud</h1>
            <form className="formStudent">
                <input type='text'
                    className='dateStudent'
                    placeholder='Nombre'
                    name='name'
                    value={contacts.name}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='cedula'
                    name='cedula'
                    value={contacts.cedula}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='Apellido 1'
                    name='primerApellido'
                    value={contacts.primerApellido}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='Apellido 2'
                    name='segundoApellido'
                    value={contacts.segundoApellido}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='Correo'
                    name='email'
                    value={contacts.email}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='Teléfono'
                    name='phone'
                    value={contacts.phone}
                    onChange={handleChange}
                />
                <label className='labelTexts'>Actualizar Estados</label>
                <select name="status" value={contacts.status} onChange={handleChange}>
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
                        value={contacts.motivo}
                        onChange={handleChange}
                    />
                </div>

                <div className='BoxbtnRol'>
                    <button className='btnRol' onClick={actualizar}>Actualizar</button>
                    <button className='btnRol' onClick={eliminar}>Eliminar</button>
                </div>
            </form>
        </div>
    )
}
