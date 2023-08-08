import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
const crypto = require('crypto')



const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "",
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,

    }]

}, {
    timestamps: true,
    versionKey: false
})

//Metodos para cifrar la contraseña.
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

userSchema.statics.comparePassword = async (password, receivedpassword) => {
    return await bcrypt.compare(password, receivedpassword)
    // Este metodo retorna true si la contraseña coincide si no es false
}




export default model('User', userSchema);