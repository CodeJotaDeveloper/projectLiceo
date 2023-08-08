import Eventos from "../models/Eventos";
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { ValidacionEvento } from "../middlewares/ValidacionEvento";
import { procesarEliminacion } from '../middlewares/eliminarImagenes';

export const createEvent = async (req, res) => {

    let listaArchivos = req.files;

    const msgError = ValidacionEvento(req, res);

    try {

        if (msgError.length > 0) {
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());
        } else {

            const {
                title,
                organizacion,
                lugar,
                fecha,
                description,
                username,
                eventImag
            } = req.body

            const newEvent = Eventos({
                title,
                organizacion,
                lugar,
                fecha,
                description,
                username,
                eventImag
            })

            if (listaArchivos) { //Si hay archivos
                newEvent.setImgUrl(listaArchivos.eventImag[0].filename);
            }
            else {
                setMessage("Error faltan los archivos adjuntos"); setData([]); setError(true);
                return res.status(400).json(getJSON())
            }
            // Agregar metodo para subir la imagen.
            const eventStored = await newEvent.save()
            setMessage("Exito"); setData(eventStored); setError(false);
            return res.status(200).json(getJSON());
        }
    } catch (e) {
        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());

    }
}

export const getEvent = async (req, res) => {
    const events = await Eventos.find();
    setMessage("Exito"); setData(events); setError(false);
    return res.status(200).json(getJSON());

}

export const getEventById = async (req, res) => {
    const evento = await Eventos.findById(req.params.eventId);
    setMessage("Exito"); setData(evento); setError(false);
    return res.status(200).json(getJSON());
}

export const updateEventtById = async (req, res) => {
    const updateEventos = await Eventos.findByIdAndUpdate(req.params.eventId, req.body, {
        new: true
    })
    setMessage("Exito"); setData(updateEventos); setError(false);
    return res.status(200).json(getJSON());

}

export const deleteEventtById = async (req, res) => {
    const { eventId } = req.params;

    if (!eventId) {
        setError(true); setData([]); setMessage("Error el ID para eliminar el evento es necesario");
        return res.status(400).json(getJSON());
    }
    // Buscamos para ver si existe el post
    const eventoBuscado = await Eventos.findById(eventId);

    if (!eventoBuscado) {//Caso donde no elimino nada por el ID incorrecto
        setError(true); setData([]); setMessage("Error el ID para eliminar no existe en la base de datos");
        return res.status(400).json(getJSON());

    }
    //Dividir la ruta de la imagen para eliminarla.
    procesarEliminacion(eventoBuscado.imgUrl, process.env.APP_PORT);

    const eliminarPost = await Eventos.findByIdAndDelete(eventId)
    setMessage("Exito"); setError(false); setData(eliminarPost);
    return res.status(200).json(getJSON());
}

