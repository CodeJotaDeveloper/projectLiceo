import { useState, useEffect, useContext } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from "react-router-dom";
import { Context } from "../../../Context/Context";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import './SinglePost.css';
import { sweetAlertMensaje } from "../../Mensajeria/Mensajeria";


const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/newPost/'

const SinglePost = () => {
    let history = useHistory()

    const location = useLocation()
    const path = location.pathname.split("/")[2]

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [username, setUsername] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [id, setId] = useState({});



    const [update, setUpdate] = useState(false);

    const { user } = useContext(Context);
    useEffect(() => {
        const showData = async () => {
            const res = await Axios.get(url + path)
            setTitle(res.data.data.title)
            setDescription(res.data.data.description)
            setImgUrl(res.data.data.imgUrl)
            setCreatedAt(res.data.data.createdAt)
            setUsername(res.data.data.username)
            setId(res.data.data._id)
        }
        showData()
    }, [path])



    const handleDelete = async () => {
        try {
            await Axios.delete(`${url}${id}`,
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                },
                { data: { username: user.username } }
            );
            sweetAlertMensaje('Exito', 'Se ha eliminado la publicación', 'success');
            window.location.replace("/")

        } catch (error) {
            sweetAlertMensaje('Error', 'En este momento no se puede eliminar la publicación', 'error');
        }
    }
    const handleUpdate = async () => {
        try {
            await Axios.put(`${url}${id}`, { username: user.username, title, description },
                {
                    headers: {
                        'x-access-token': `${user.token}`
                    }
                }
            );
            sweetAlertMensaje('Exito', 'Se ha actualizado la noticia', 'success');
            history.push('/');
        } catch (error) {
            sweetAlertMensaje('Error', 'En este momento no se puede actualizar la publicación', 'error');
        }
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
                        {update ? <input type='text' value={title} className='updateInput' onChange={(event) => setTitle(event.target.value)} /> : <h1 className="textSingle"><b>Título de la noticia: </b>{title}</h1>}
                        <p className="textSingle"><b>Fecha de la publición de la noticia:</b> {new Date(createdAt).toLocaleString()}</p>
                        {update ? <textarea value={description} cols='30' rows='10' className="updateInput" onChange={(event) => setDescription(event.target.value)}></textarea> : <p className="textSingle"><b>Descripción: </b>{description}</p>}
                        <p className="textSingle"><b>Autor: </b> <Link to={`/?user=${username}`}>{username}</Link></p>

                    </div>
                </div>
            </section>
        </>
    )
}
export default SinglePost