import { useContext, useState } from 'react';
import { Context } from '../../../Context/Context';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { sweetAlertMensaje } from '../../Mensajeria/Mensajeria';

import './WritePosts.css';

const { REACT_APP_PORT } = process.env;// Trabajar variables entorno React
const { REACT_APP_HOST } = process.env;// Trabajar variables entorno React
const { REACT_APP_PROTOCOL } = process.env;// Trabajar variables entorno React

const url = REACT_APP_PROTOCOL + REACT_APP_HOST + REACT_APP_PORT + '/api/newPost'

const WritePost = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState('');
    const { user } = useContext(Context);
    let history = useHistory();


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('imgUrl', image);
        formData.append('username', user.username);
        try {
            const res = await Axios.post(url, formData, {
                headers: {
                    'x-access-token': `${user.token}`
                }
            });
            if (res.data.error === true) {//campos enviados mal validar
                sweetAlertMensaje('Advertencia', res.data.mensaje, 'info');
            } else {//todo salio bien exitos
                sweetAlertMensaje('Exito', res.data.mensaje, 'success');
                history.push('/');
            }


        } catch (error) {
            sweetAlertMensaje('Error', 'No se completó los campos de la publicación', 'error');
        }
        // }



    }
    return (
        <div className='conatinerEvents'>
            <div className='boxWriteEvents'>
                <span className='titleEvents'>Publicación de Noticias</span>
                <div className='writeEvents'>

                    <form className='formNews'>
                        <div className='boxTextPost'>
                            <label className='textLabel'>Título</label>
                            <input className='titlewrite'
                                type="text"
                                value={title}
                                placeholder='Título'
                                onChange={(event) => { setTitle(event.target.value); }}
                                required
                            />
                        </div>
                        <div className='boxTextPost'>
                            <label className='textLabelDes'>Descripción</label>
                            <textarea className='descwrite'
                                placeholder='Descripción'
                                type='text'
                                name='commentPost'
                                onChange={(event) => { setDescription(event.target.value); }}
                                required
                            />
                        </div>

                        <div className='boxImagen'>
                            {image && (<img className='image' style={{ padding: '10px' }} width={150} height={100} src={URL.createObjectURL(image)} alt='imagenes' />)}
                            <input type="file"
                                id='inputfile'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className='boxbutton'>
                            <button className='writesumbit' onClick={handleSubmit}>Publicar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default WritePost