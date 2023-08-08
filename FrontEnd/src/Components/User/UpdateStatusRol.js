import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Context } from "../../Context/Context"
import { useParams, useHistory } from 'react-router-dom'
import './listUser.css';

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/root/traerusuarioid'
const UrlUpdate = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/root/actualizarusuario'
const urlDelete = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/root/rol'


export const UpdateStatusRol = () => {
    let history = useHistory()
    const { id } = useParams();
    const { user } = useContext(Context)

    const [nameRole, setNameRole] = useState({

        username: "",
        roles: "",
        email: ""
    })


    const handleChange = (e) => {
        const dato = { ...nameRole };
        dato[e.target.name] = e.target.value
        setNameRole(dato)
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
            setNameRole(data.data)
        }
        show()
    }, [])


    const actualizar = async (e) => {
        e.preventDefault();


        try {
            await axios.put(UrlUpdate + '/' + id, nameRole,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            history.push('/listUsers')
        } catch (error) {

        }
    }

    const eliminarRol = async (e) => {
        e.preventDefault();

        try {
            await axios.put(urlDelete + '/' + id, nameRole,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            )
            history.push('/listUsers')
        } catch (error) {

        }

    }

    return (
        <div className="boxcontacto" >
            <h1 className='textFormsPre'>Actualizar Lista de Usuarios</h1>
            <form className="formStudent">
                <input type='text'
                    className='dateStudent'
                    placeholder='Cedula'
                    name='username'
                    value={nameRole.username}
                    onChange={handleChange}
                />
                <input type='text'
                    className='dateStudent'
                    placeholder='Cedula'
                    name='email'
                    value={nameRole.email}
                    onChange={handleChange}
                />
                <div>
                    <label className='labelTexts'>Actualizar Estados</label>
                    <select name="roles" value={nameRole.roles} onChange={handleChange}>
                        <option >Elija el estado</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Profesor">Profesor</option>
                        <option value="Encargado Legal">Encargado Legal</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                </div>

                <div className='BoxbtnRol'>
                    <button className='btnRol' onClick={actualizar}>Actualizar</button>
                    <button className='btnRol' onClick={eliminarRol}>EliminarRol</button>
                </div>

            </form>

        </div>
    )
}
