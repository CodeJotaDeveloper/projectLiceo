import Contact from "../models/Contact"// Importar la base de datos de contacto
import { ValidacionContact } from "../middlewares/validacionesContact";
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { enviarCorreoConfirmacionContacto, enviarCorreoActualizacionContacto } from '../middlewares/envioEmailContact';
var validator = require("email-validator");


export const createContact = async (req, res) => {
    //console.log(req.body)// Ver datos enviados desde PostMan
    const msgError = ValidacionContact(req, res);

    try {

        if (msgError.length > 0) {
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());

        } else {
            //console.log(req.body)
            const date = new Date();
            const year = date.getFullYear();

            const {

                name,
                primerApellido,
                segundoApellido,
                email,
                phone,
                cedula,
                request } = req.body


            if (email) { //Caso donde se envia el correo y es incorrecto.


                if (!validator.validate(email)) {
                    setError(true); setData([]); setMessage("El correo no cumple el formato correcto.");
                    return res.status(400).json(getJSON());
                }
            }
            const newContact = new Contact({
                name,
                primerApellido,
                segundoApellido,
                email,
                phone,
                cedula,
                request,
                status: "Creado"

            });

            const contactSaved = await newContact.save()

            //Metodo externo que se utiliza para enviar el correo electronico de recuperacion.
            enviarCorreoConfirmacionContacto(contactSaved);

            setMessage("Exito"); setData(contactSaved); setError(false);
            return res.status(200).json(getJSON());
        }

    } catch (e) {
        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());
    }
}

export const getContact = async (req, res) => {
    const contacts = await Contact.find();
    setMessage("Exito"); setData(contacts); setError(false);
    return res.status(200).json(getJSON());

}

export const getContactById = async (req, res) => {
    const contact = await Contact.findById(req.params.contactId);
    setMessage("Exito"); setData(contact); setError(false);
    return res.status(200).json(getJSON());
}



export const updateContactById = async (req, res) => {
    const contactSaved = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
        new: true
    })
    enviarCorreoActualizacionContacto(contactSaved);
    setMessage("Exito"); setData(contactSaved); setError(false);
    return res.status(200).json(getJSON());

}

//Falta cambiar estructura JSON para eliminar.
export const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const contactBuscado = await Contact.findByIdAndDelete(contactId)
    setMessage("Exito"); setData(contactBuscado); setError(false);
    return res.status(200).json(getJSON());

}