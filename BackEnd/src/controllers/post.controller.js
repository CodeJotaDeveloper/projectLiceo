import Post from "../models/Post"// Importar la base de datos de Post
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { ValidacionPost } from "../middlewares/ValidacionesPost";
import { procesarEliminacion } from '../middlewares/eliminarImagenes';
require('dotenv').config();


export const createPost = async (req, res) => {

    let listaArchivos = req.files;
    const msgError = ValidacionPost(req, res);

    try {

        if (msgError.length > 0) {
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());
        } else {

            const {
                title,
                description,
                imgUrl,
                username
            } = req.body

            const newPost = Post({
                title,
                description,
                imgUrl,
                username
            });

            if (listaArchivos) { //Si hay archivos
                newPost.setImgUrl(listaArchivos.imgUrl[0].filename);

            } else {
                setMessage("Error faltan los archivos adjuntos"); setData([]); setError(true);
                return res.status(400).json(getJSON())
            }

            const postStored = await newPost.save()

            setMessage("Exito"); setData(postStored); setError(false);
            return res.status(200).json(getJSON());
        }

    } catch (e) {
        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());
    }

}


export const getPost = async (req, res) => {
    const post = await Post.find();
    setMessage("Exito"); setData(post); setError(false);
    return res.status(200).json(getJSON());
}

export const getPostById = async (req, res) => {

    const post = await Post.findById(req.params.postId);
    setMessage("Exito"); setData(post); setError(false);
    return res.status(200).json(getJSON());
}

export const updatePostById = async (req, res) => {
    const updatePost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
        new: true
    })
    setMessage("Exito"); setData(updatePost); setError(false);
    return res.status(200).json(getJSON());
}


export const deletePostById = async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        setError(true); setData([]); setMessage("Error el ID para el delete necesario");
        return res.status(400).json(getJSON());
    }
    // Buscamos para ver si existe el post
    const postBuscado = await Post.findById(postId);

    if (!postBuscado) {//Caso donde no elimino nada por el ID incorrecto
        setError(true); setData([]); setMessage("Error el ID para eliminar no existe en la base de datos");
        return res.status(400).json(getJSON());

    }
    //Dividir la ruta de la imagen para eliminarla.
    procesarEliminacion(postBuscado.imgUrl, process.env.APP_PORT);

    const eliminarPost = await Post.findByIdAndDelete(postId)
    setMessage("Exito"); setError(false); setData(eliminarPost);
    return res.status(200).json(getJSON());
}
