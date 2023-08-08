import { Schema, model } from "mongoose";

//export const ROLES = ["Administrador", "Encargado Legal", "Estudiante", "Profesor", "Root"]

const roleSchema = new Schema({
    name: String,
    permissions: [
        {
            id: Number,
            name: String,
            has: Boolean,
            path: String,
            icon: String

        }
    ],
    usuario: {
        ref: "User",
        type: Schema.Types.ObjectId,
    }
}, {
    versionKey: false
});

export default model("Role", roleSchema)