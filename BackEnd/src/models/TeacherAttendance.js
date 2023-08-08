import { Schema, model } from "mongoose";

const TeacherAttendanceSchema = new Schema({
    Cedula_Student: {
        type: String,
        require: true,
    },
    NameStudent: {
        type: String,
        required: true,
    },
    Primer_Apellido_Student: {
        type: String,
        required: true
    },
    Segundo_Apellido_Student: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    absence: {
        type: String,
        required: true,
    },
    cantidad: {
        type: String,
        required: true,
    },
    emailTeacher: {
        type: String,
        required: true,
    },
    emailLegalManager: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
    versionKey: false
});

export default model('TeacherAttendance', TeacherAttendanceSchema)