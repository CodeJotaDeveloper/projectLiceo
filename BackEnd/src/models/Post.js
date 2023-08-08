import { Schema, model } from "mongoose";
require('dotenv').config();

import config from "../config";

const PostSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    }

}, {
    timestamps: true,
    versionKey: false
});

PostSchema.methods.setImgUrl = function setImgUrl(filename) {
    // const { host, port } = config
    //   console.log('Filename: ' + filename)
    this.imgUrl = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}${process.env.APP_PORT}/storage/imgs/post/${filename}`

}

export default model('Post', PostSchema)