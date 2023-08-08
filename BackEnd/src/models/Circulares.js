import { Schema, model } from "mongoose";
require('dotenv').config();


const CircularesSchema = new Schema({
    consecutivoCircular: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    circularImag: {
        type: String,
        require: false,
    },
    username: {
        type: String,
        required: false,
    },

}, {
    timestamps: true,
    versionKey: false
});

CircularesSchema.methods.setImgUrl = function setImgUrl(filename) {
    // const { host, port } = config

    this.circularImag = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}${process.env.APP_PORT}/storage/imgs/circular/${filename}`

}


export default model('Circulares', CircularesSchema)