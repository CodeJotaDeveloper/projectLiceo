import { Schema, model } from "mongoose";

const RootSchema = new Schema({

    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Root', RootSchema)