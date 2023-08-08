import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    organizacion: {
        type: String,
        required: true,
    },
    lugar: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
    versionKey: false
});

EventSchema.methods.setImgUrl = function setImgUrl(filename) {
    // const { host, port } = config

    this.imgUrl = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}${process.env.APP_PORT}/storage/imgs/evento/${filename}`

}

export default model('Eventos', EventSchema)