import { Schema, model } from "mongoose";

const PreMatriculaSchema = new Schema({
    Period: {
        type: String,
        required: true,
    },
    NameStudent: {
        type: String,
        required: false,
    },
    Primer_Apellido_Student: {
        type: String,
        required: true
    },
    Segundo_Apellido_Student: {
        type: String,
        required: true,
    },
    fecha_nacimiento_iso: {
        type: String,
        required: true,
    },
    Cedula_Student: {
        type: String,
        required: true,
    },
    cedStudentPhotoFrontal: {
        type: String,
        required: true,
    }
    ,
    cedStudentPhotoDorsal: {
        type: String,
        required: true,
    },
    Gender_Student: {
        type: String,
        required: true
    },
    Nacionalidad_Student: {
        type: String,
        required: true
    },
    Institucion_Procedencia_Student: {
        type: String,
        required: true
    },

    //Encargado legal

    Name_Legal_Manager: {
        type: String,
        required: true,

    },
    Primer_Apellido_Legal_Manager: {
        type: String,
        required: true
    },
    Segundo_Apellido_Legal_Manager: {
        type: String,
        required: true,
    },
    Number_Phone_Legal_Manager: {
        type: String,
        required: true,
    },
    Email_Legal_Manager: {
        type: String,
        required: true,
    },
    Cedula_Legal_Manager: {
        type: String,
        required: true,
    },
    cedManagerPhotoFrontal: {
        type: String,
        required: true,
    },
    cedManagerPhotoDorsal: {
        type: String,
        required: true,
    },


    Ocupacion_Legal_Manager: {
        type: String,
        required: true,
    },

    Gender_Legal_Manager: {
        type: String,
        required: true
    },
    Nacionalidad_Legal_Manager: {
        type: String,
        required: true
    },
    Relationship_Legal_Manager: {
        type: String,
        required: true
    },
    fecha_nacimiento_Legal_Manager_iso: {
        type: String,
        required: true,
    },
    Address_Legal_Manager: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    reciboDireccion: {
        type: String,
        required: true,
    },
    poliza: {
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

PreMatriculaSchema.methods.setImgUrlEstudianteFrontal = function setImgUrlEstudianteFrontal(filename) {
    // const { host, port } = config

    this.cedStudentPhotoFrontal = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}

PreMatriculaSchema.methods.setImgUrlEstudianteDorsal = function setImgUrlEstudianteDorsal(filename) {
    // const { host, port } = config

    this.cedStudentPhotoDorsal = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}

PreMatriculaSchema.methods.setImgUrlEncargadoLegalFrontal = function setImgUrlEncargadoLegalFrontal(filename) {
    // const { host, port } = config

    this.cedManagerPhotoFrontal = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}

PreMatriculaSchema.methods.setImgUrlEncargadoLegalDorsal = function setImgUrlEncargadoLegalDorsal(filename) {
    // const { host, port } = config

    this.cedManagerPhotoDorsal = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}

PreMatriculaSchema.methods.setImgUrlreciboDireccion = function setImgUrlreciboDireccion(filename) {
    // const { host, port } = config

    this.reciboDireccion = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}

PreMatriculaSchema.methods.setImgUrlPoliza = function setImgUrlPoliza(filename) {
    // const { host, port } = config

    this.poliza = `${process.env.APP_PROTOCOL}${process.env.DB_HOST}:${process.env.APP_PORT}/storage/prematricula/${filename}`

}


export default model('Prematricula', PreMatriculaSchema)


/*
SchemaPreMatricula.virtual('fecha_nacimiento')
    .set(function (fecha) {
        this.fecha_nacimiento_iso = new Date(fecha)
    }).get(function () {
        return this.fecha_nacimiento_iso.toISOString().substring(0, 10);
    });

const UserModel = mongoose.model("Prematricula", SchemaPreMatricula)
module.exports = UserModel;

*/