import { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { Context } from "../../../Context/Context";
import { FaRegEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { sweetAlertMensaje } from "../../Mensajeria/Mensajeria";

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/circulares/'

const SingleCirculares = () => {

    const location = useLocation()
    const path = location.pathname.split("/")[2]

    const [postCircular, setPostCircular] = useState({});
    const [title, setTitle] = useState("");
    const [createdAt, setCreatedAt] = useState('')
    const [id, setId] = useState('')


    const [description, setDescription] = useState("");
    const [consecutivoCircular, setconsecutivoCircular] = useState('')
    const [username, setUsername] = useState('')


    const [update, setUpdate] = useState(false);



    useEffect(() => {
        const showData = async () => {
            const res = await axios.get(url + path)
            setPostCircular(res.data)
            setTitle(res.data.data.title)
            setCreatedAt(res.data.data.createdAt)
            setDescription(res.data.data.description)
            setconsecutivoCircular(res.data.data.consecutivoCircular)
            setId(res.data.data._id)
            setUsername(res.data.data.username)

        }
        showData()
    }, [path])

    const { user } = useContext(Context)

    const handleDelete = async () => {
        try {
            await axios.delete(`${url}${id}`,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                },
                { data: { username: user.username } }
            )
            sweetAlertMensaje('Exito', 'Se ha eliminado la Circular', 'success');

            window.location.replace("/")// Para eviar que usuario intente devolverse al contenido que elimino.
        } catch (error) { }
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`${url}${id}`, { username: user.username, title, description, consecutivoCircular },
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                },
            )
            sweetAlertMensaje('Exito', 'Se ha actualizado la Circular', 'success');

            window.location.reload("/")
        } catch (error) { }
    }
    return (
        <>
            <section className="singlePost">
                <div className="singlePostWrapper">
                    <div className="imagen"> {postCircular.circularImag && <img className="singlePostImg" src={postCircular.circularImag} alt='' />}</div>
                    <div className="rigth">

                        {username === user?.username && (
                            <div className="buttons">
                                <button className="button" onClick={() => setUpdate(true)}>
                                    <FaRegEdit />
                                </button>
                                <button className="button" onClick={handleDelete}>
                                    <MdDeleteOutline />
                                </button>
                                {update && (
                                    <button className="button" onClick={handleUpdate}>Actualizar</button>
                                )}
                            </div>
                        )}

                        {update ? <input type='text' value={title} className='updateInput' onChange={(event) => setTitle(event.target.value)} /> : <h1 className="textSingle"> <b>Título de la Circular: </b> {title}</h1>}
                        <p className="textSingle"><b>Fecha de la publicion del evento:</b> {new Date(createdAt).toLocaleString()}</p>
                        {update ? <input type='text' value={consecutivoCircular} className='updateInput' onChange={(event) => setconsecutivoCircular(event.target.value)} /> : <p className="textSingle"> <b>Consecutivo Circular: </b> {consecutivoCircular}</p>}
                        {update ? <textarea value={description} cols='30' rows='10' className="updateInput" onChange={(event) => setDescription(event.target.value)}></textarea> : <p className="textSingle"><b>Descripción: </b>{description}</p>}
                        <p className="textSingle"><b>Autor: </b> <Link to={`/?user=${username}`}>{username}</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleCirculares