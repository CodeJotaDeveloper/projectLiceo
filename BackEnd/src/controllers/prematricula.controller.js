import Prematricula from '../models/Prematricula'
import Estados from "../models/Estados";
import { setData, setError, setMessage, getJSON } from '../models/crearJSON';
import { enviarCorreoConfirmacionPrematricula, enviarCorreoActualizacionPrematricula } from '../middlewares/envioEmailPrematricula';
import { UsuarioTeacherAsistencia } from '../middlewares/validacionTeacherAsistencia';
import { VoucherPrematriculaEstudiante, LegalGuardianEnrollment } from '../middlewares/validacionVoucherPrematriculaEstudiante';
import { validarFormularioPrematricula } from '../middlewares/validacionesFormularios';
import { emailPrematriculaeliminada } from '../middlewares/envioEmailEliminacionPrematricula';
import { procesarEliminacion } from '../middlewares/eliminarImagenes';

export const createPrematricula = async (req, res) => {

    let listaArchivos = req.files;

    const msgError = validarFormularioPrematricula(req, res);

    var dataJSON = {};
    const estados = [];

    try {
        if (msgError.length > 0) {//Error faltan datos requeridos
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());
        } else {

            const date = new Date();
            const year = date.getFullYear();

            const {

                NameStudent,
                Primer_Apellido_Student,
                Segundo_Apellido_Student,
                fecha_nacimiento_iso,
                Cedula_Student,
                Gender_Student,
                Nacionalidad_Student,
                Institucion_Procedencia_Student,

                Name_Legal_Manager,
                Primer_Apellido_Legal_Manager,
                Segundo_Apellido_Legal_Manager,
                Number_Phone_Legal_Manager,
                Email_Legal_Manager,
                Cedula_Legal_Manager,
                Ocupacion_Legal_Manager,
                Gender_Legal_Manager,
                Nacionalidad_Legal_Manager,
                Relationship_Legal_Manager,
                Address_Legal_Manager,
                fecha_nacimiento_Legal_Manager_iso,
                username
            } = req.body;

            let exiteCedulaEstudiante = await Prematricula.findOne({ Cedula_Student, Cedula_Legal_Manager, Period: year });

            if (!exiteCedulaEstudiante) { //otro encargado legal quiera matricular cuando ya existe la matricula
                exiteCedulaEstudiante = await Prematricula.findOne({ Cedula_Student, Period: year });
            }

            if (exiteCedulaEstudiante) { //Caso donde ya existe la cedula del estudiante en la base de datos
                setError(true); setData([]); setMessage("Ya existe una matricula con la cedula: " + Cedula_Student + ", para el periodo: " + year);
                return res.status(200).json(getJSON());
            }

            const newPrematricula = new Prematricula({
                cedStudentPhotoFrontal: '',
                cedStudentPhotoDorsal: '',
                Period: year,
                NameStudent,
                Primer_Apellido_Student,
                Segundo_Apellido_Student,
                fecha_nacimiento_iso,
                Cedula_Student,
                Gender_Student,

                Nacionalidad_Student,
                Institucion_Procedencia_Student,
                Name_Legal_Manager,
                Primer_Apellido_Legal_Manager,
                Segundo_Apellido_Legal_Manager,
                Number_Phone_Legal_Manager,
                Email_Legal_Manager,

                Cedula_Legal_Manager,
                cedManagerPhotoFrontal: '',
                cedManagerPhotoDorsal: '',
                Ocupacion_Legal_Manager,
                Gender_Legal_Manager,
                Nacionalidad_Legal_Manager,
                Relationship_Legal_Manager,
                Address_Legal_Manager,
                fecha_nacimiento_Legal_Manager_iso,
                username,
                //Adjunto direccion y poliza
                reciboDireccion: '',
                poliza: '',
                status: "Creado"

            });

            if (listaArchivos) { //Si hay archivos
                newPrematricula.setImgUrlEstudianteFrontal(listaArchivos.cedStudentPhotoFrontal[0].filename);
                newPrematricula.setImgUrlEstudianteDorsal(listaArchivos.cedStudentPhotoDorsal[0].filename);
                newPrematricula.setImgUrlEncargadoLegalFrontal(listaArchivos.cedManagerPhotoFrontal[0].filename)
                newPrematricula.setImgUrlEncargadoLegalDorsal(listaArchivos.cedManagerPhotoDorsal[0].filename)
                newPrematricula.setImgUrlreciboDireccion(listaArchivos.reciboDireccion[0].filename);
                newPrematricula.setImgUrlPoliza(listaArchivos.poliza[0].filename);

            } else {// caso donde no se envian los archivos adjuntos de la prematricula
                setMessage("Error faltan los archivos adjuntos"); setData([]); setError(true);
                return res.status(200).json(getJSON())
            }

            if (estados) {
                const foundEstados = await Estados.find({ estado: { $in: estados } })// buscar el nombre en todas las colecciones buscar el estado
                newPrematricula.Estado = foundEstados.map(role => role._id)
            } else {
                const role = await Estados.findOne({ estado: "Creado" }) // Asignar rol por defecto
                newPrematricula.Estado = [role._id];
            }

            const prematriculaSaved = await newPrematricula.save();

            enviarCorreoConfirmacionPrematricula(prematriculaSaved);

            setMessage("Exito"); setData({ message: 'Ha matriculado al estudiante de forma correcta.' }); setError(false);
            return res.status(200).json(getJSON());
        }
    } catch (e) {

        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());
    }
}

export const getPrematricula = async (req, res) => {
    const prematricula = await Prematricula.find();
    setMessage("Exito"); setData(prematricula); setError(false);
    return res.status(200).json(getJSON());

}


export const getPrematriculaById = async (req, res) => {
    const prematricula = await Prematricula.findById(req.params.prematriculaId);
    setError(false); setData(prematricula); setMessage("Exito");
    return res.status(200).json(getJSON())

}

// Metodo para traer la prematricula del usuario que matriculo al estudiante.
export const getPrematriculaByUser = async (req, res) => {
    const { Cedula } = req.params;
    let prematriculaUsuario = [];
    const existePrematricula = await UsuarioTeacherAsistencia(Cedula);

    if (Object.entries(existePrematricula).length === 0) {
        setError(true); setData({ mensaje: 'Error la prematricula no existe con esa cédula.' }); setMessage("Error");
        return res.status(400).json(getJSON())
    }
    prematriculaUsuario.push(existePrematricula);
    setError(false); setData(prematriculaUsuario); setMessage("Exito");
    return res.status(200).json(getJSON())

}

export const getVoucherPrematriculaStudent = async (req, res) => {

    const { Cedula } = req.params;
    let prematriculaUsuario = [];
    const existePrematricula = await VoucherPrematriculaEstudiante(Cedula);

    if (Object.entries(existePrematricula).length === 0) {
        setError(true); setData({ mensaje: 'Error la prematricula no existe con esa cédula.' }); setMessage("Error");
        return res.status(400).json(getJSON())
    }
    prematriculaUsuario.push(existePrematricula);
    setError(false); setData(prematriculaUsuario); setMessage("Exito");
    return res.status(200).json(getJSON())

}


// Traer los estudiantes que tiene un encargad matriculado.
export const getAllStudentEnrollment = async (req, res) => {
    const { Cedula_Legal_Manager } = req.params;

    const existePrematricula = await LegalGuardianEnrollment(Cedula_Legal_Manager);

    if (Object.entries(existePrematricula).length === 0) {
        setError(true); setData({ mensaje: 'Error la prematricula no existe con esa cédula.' }); setMessage("Error");
        return res.status(400).json(getJSON())
    }
    setError(false); setData(existePrematricula); setMessage("Exito");
    return res.status(200).json(getJSON())
}

export const updatePrematriculaById = async (req, res) => {
    const prematriculaSaved = await Prematricula.findByIdAndUpdate(req.params.prematriculaId, req.body, {
        new: true
    })
    enviarCorreoActualizacionPrematricula(prematriculaSaved)
    setMessage("Exito"); setData(prematriculaSaved); setError(false);
    return res.status(200).json(getJSON());
}

export const rootAddEstadoPrematricula = async (req, res) => {

    var { estadoPrematricula: EstadoPrematricula } = req.body; //parametro por body
    const prematriculaId = req.params.prematriculaId; //parametro por URL

    //Validar que mandara el ID

    if (!prematriculaId) {
        setError(true); setMessage("No se envio el ID de la Prematricula"); setData([]);
        return res.status(400).json(getJSON());
    }
    //Validar que el nombre del rol se mande y no llegue vacio
    if (!EstadoPrematricula) {
        setError(true); setMessage("El nombre del estado de la prematricula no debe estar vacio."); setData([]);
        return res.status(400).json(getJSON());
    }

    const prematricula = await Prematricula.findById(prematriculaId); //Buscar el usuario por ID
    //caso donde no hay usario encontrado por ese ID
    if (!prematricula) {
        setError(true); setMessage("Usuario no encontrado, ID [ " + prematriculaId + " ]"); setData([]);
        return res.status(410).json(getJSON());
    }

    let vectorprematricula = []; //vector para actualizar
    vectorprematricula = prematricula.Estado; //asigna el vector de user a la variable
    const estado = await Estados.findOne({ estado: EstadoPrematricula }) // Encuentra el rol en la lista

    //Caso donde no se encuentra el rol, nombre incorrecto
    if (!estado) {
        setError(true); setMessage("Error, no existe el nombre [ " + EstadoPrematricula + " ] del ESTADO en la base de datos"); setData([]);
        return res.status(400).json(getJSON());
    }
    let existe = -1;//si es -1 no existe el rol
    existe = vectorprematricula.indexOf(estado.id); //existe el rol para el usuario
    //existe el rol ya asignado al usuario
    if (existe >= 0) {
        setError(true); setMessage("El usuario posee ya el rol a asignar [ " + EstadoPrematricula + " ]"); setData([]);
        return res.status(400).json(getJSON());
    }
    //console.log(estado._id);
    vectorprematricula.push(estado._id); //agrega el rol en el vector
    const updatePrematricula = await Prematricula.findByIdAndUpdate(prematriculaId,
        { Estado: vectorprematricula[1] }, //Actualiza el estado en la posicion 1 ya que no estamos agregando mas estados.
        { new: true });
    setError(false); setMessage("Exito"); setData(updatePrematricula);
    return res.status(200).json(getJSON());
}

/**
 * Metodo que permite eliminar prematricula del sistema
 * @param {*} req 
 * @param {*} res 
 * @returns  un objeto JSON con la respuesta
 */
export const deletePrematriculaById = async (req, res) => {
    const { prematriculaId } = req.params;
    let prematriculaEliminada = await Prematricula.findById(prematriculaId);
    //Dividir la ruta de la imagen para cedula estudiante frontal.
    procesarEliminacion(prematriculaEliminada.cedStudentPhotoFrontal, process.env.APP_PORT);
    //Dividir la ruta de la imagen para cedula estudiante dorsal.
    procesarEliminacion(prematriculaEliminada.cedStudentPhotoDorsal, process.env.APP_PORT);
    //Dividir la ruta de la imagen para cedula Manager Photo Frontal.
    procesarEliminacion(prematriculaEliminada.cedManagerPhotoFrontal, process.env.APP_PORT);
    //Dividir la ruta de la imagen para cedula Manager Photo dorsal.
    procesarEliminacion(prematriculaEliminada.cedManagerPhotoDorsal, process.env.APP_PORT);
    //Dividir la ruta de eliminar la imagen del recibo con la direccion.
    procesarEliminacion(prematriculaEliminada.reciboDireccion, process.env.APP_PORT);
    //Dividir la ruta de eliminar la imagen de la poliza con la direccion.
    procesarEliminacion(prematriculaEliminada.poliza, process.env.APP_PORT);

    prematriculaEliminada = await Prematricula.findByIdAndDelete(prematriculaId);
    //pendiente consultar con chalo
    emailPrematriculaeliminada(prematriculaEliminada);

    setMessage('exito'); setError(false); setData(prematriculaEliminada);
    return res.status(200).json(getJSON());
}


