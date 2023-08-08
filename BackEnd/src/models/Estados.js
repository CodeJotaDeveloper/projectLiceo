import { Schema, model } from "mongoose";

//export const estado = ["Creado", "Completado", "Pendiente", "Rechazado"]


const EstadoSchema = new Schema({
    estado: String
}, {
    versionKey: false
});

export default model("estados", EstadoSchema)