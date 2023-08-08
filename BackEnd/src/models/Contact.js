import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        require: true,
    },
    primerApellido: {
        type: String,
        required: true
    },
    segundoApellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    request: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    motivo: {
        type: String,
        required: false,
    },

    Estado: [{
        ref: "Estado",
        type: Schema.Types.ObjectId

    }]
}, {
    timestamps: true,
    versionKey: false
});

export default model('Contact', ContactSchema)