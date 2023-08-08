import { useState, useEffect, useContext } from "react";
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

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/eventos/'


const SingleEvents = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [organizacion, setOrgan] = useState("");
    const [lugar, setlugar] = useState("")
    const [fecha, setfecha] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [username, setUsername] = useState("")
    const [id, setId] = useState("")
    const [createdAt, setCreatedAt] = useState("")


    const [postEvent, setPostEvent] = useState({})
    const [update, setUpdate] = useState(false)



    useEffect(() => {
        const showData = async () => {
            const res = await axios.get(url + path)
            setPostEvent(res.data)
            setTitle(res.data.data.title)
            setOrgan(res.data.data.organizacion)
            setfecha(res.data.data.fecha)
            setlugar(res.data.data.lugar)
            setDescription(res.data.data.description)
            setImgUrl(res.data.data.imgUrl)
            setUsername(res.data.data.username)
            setId(res.data.data._id)
            setCreatedAt(res.data.data.createdAt)
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
                { data: { username: user.username } });
            sweetAlertMensaje('Exito', 'Se ha eliminado el Evento', 'success');
            window.location.replace("/")// Para eviar que usuario intente devolverse al contenido que elimino.
        } catch (error) { }
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`${url}${id}`, { username: user.username, title, description, lugar, fecha, organizacion },
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                },
            )
            sweetAlertMensaje('Exito', 'Se ha actualizado el Evento', 'success');

            window.location.reload()
        } catch (error) { }
    }
    return (
        <>
            <section className="singlePost">
                <div className="singlePostWrapper">
                    <div className="imagen"> {imgUrl && <img className="singlePostImg" src={imgUrl} alt='' />}</div>
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
                        {update ? <input type='text' value={title} className='updateInput' onChange={(event) => setTitle(event.target.value)} /> : <h1 className="textSingle"><b>Título: </b> {title}</h1>}
                        <p className="textSingle"><b>Fecha de la publicion del evento:</b> {new Date(createdAt).toLocaleString()}</p>
                        {update ? <input type='text' value={organizacion} className='updateInput' onChange={(event) => setOrgan(event.target.value)} /> : <p className="textSingle"><b>Organizador:</b> {organizacion}</p>}
                        {update ? <input type='text' value={fecha} className='updateInput' onChange={(event) => setfecha(event.target.value)} /> : <p className="textSingle"><b>Fecha del evento:</b> {fecha}</p>}
                        {update ? <input type='text' value={lugar} className='updateInput' onChange={(event) => setlugar(event.target.value)} /> : <p className="textSingle"><b>Lugar:</b> {lugar}</p>}
                        {update ? <textarea value={description} cols='30' rows='10' className="updateInput" onChange={(event) => setDescription(event.target.value)}></textarea> : <p className="textSingle"><b>Descripción:</b> {description}</p>}

                        <p className="textSingle"><b>Autor:</b> <Link to={`/?user=${username}`}>{username}</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleEvents