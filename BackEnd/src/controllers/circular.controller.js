import Circulares from "../models/Circulares";
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { ValidacionCircular } from "../middlewares/ValidacionCircular";
import { procesarEliminacion } from '../middlewares/eliminarImagenes';

require('dotenv').config();


export const createCirculares = async (req, res) => {

    const msgError = ValidacionCircular(req, res);
    try {


        if (msgError.length > 0) {
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());
        } else {

            const {
                title,
                description,
                circularImag,
                username,
                consecutivoCircular
            } = req.body

            const newCircular = new Circulares({
                title,
                description,
                circularImag,
                username,
                consecutivoCircular
            });

            if (req.file) {
                const { filename } = req.file
                newCircular.setImgUrl(filename)
            }

            const circularSaved = await newCircular.save()
            setMessage("Exito"); setData(circularSaved); setError(false);
            return res.status(200).json(getJSON());
        }
    } catch (error) {
        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());
    }



}

export const getCirculares = async (req, res) => {
    const circulares = await Circulares.find();
    setMessage("Exito"); setData(circulares); setError(false);
    return res.status(200).json(getJSON());
}

export const getCircularById = async (req, res) => {
    const circular = await Circulares.findById(req.params.circularId);
    setMessage("Exito"); setData(circular); setError(false);
    return res.status(200).json(getJSON());
}

export const updateCirculartById = async (req, res) => {
    const updateCirculares = await Circulares.findByIdAndUpdate(req.params.circularId, req.body, {
        new: true
    })
    setMessage("Exito"); setData(updateCirculares); setError(false);
    return res.status(200).json(getJSON());

}


export const deleteCirculartById = async (req, res) => {
    const { circularId } = req.params;

    if (!circularId) {
        setError(true); setData([]); setMessage("Error el ID para eliminar la circulare es necesario");
        return res.status(400).json(getJSON());
    }
    // Buscamos para ver si existe la circular
    const circularBuscada = await Circulares.findById(circularId);


    if (!circularBuscada) {//Caso donde no elimino nada por el ID incorrecto
        setError(true); setData([]); setMessage("Error el ID para eliminar no existe en la base de datos");
        return res.status(400).json(getJSON());

    }

    // Con este if verificamos si los datos existen y si no esta la ruta de la imagen eliminamos la circular.
    if (circularBuscada.title && circularBuscada.description && circularBuscada.username &&
        circularBuscada.consecutivoCircular && !circularBuscada.circularImag) {
        await Circulares.findByIdAndDelete(circularId)
        return res.status(204).json();
    } else {

        //Dividir la ruta de la imagen para eliminarla.
        let vector = circularBuscada.circularImag + process.env.APP_PORT;
        let vectorSplict = vector.split(process.env.APP_PORT);

        eliminarImagenLocal(vectorSplict[1]);//Se procede a eliminar el archivo local.

        const eliminarCircular = await Circulares.findByIdAndDelete(circularId)
        setMessage("Exito"); setError(false); setData(eliminarCircular);
        return res.status(200).json(getJSON());


    }

}

export const eliminarImagenLocal = (filePath) => {
    const fs = require('fs');
    filePath = "src/public" + filePath;
    let bandera = false;
    fs.access(filePath, (error) => {
        if (!error) {
            fs.unlinkSync(filePath);
        } else {
            console.error('Error Ocurred', error)
        }
    })

}