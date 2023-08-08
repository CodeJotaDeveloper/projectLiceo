import Prematricula from "../models/Prematricula";

//Este metodo es para devolver datos especificos de la coleccion prematricula en JSON
export const UsuarioTeacherAsistencia = async function (usuarioCedula) {

    const matriculaEncontrada = await Prematricula.find({ Cedula_Student: usuarioCedula });


    if (matriculaEncontrada.length === 0) {
        return {};

    } else {
        return {
            NameStudent: matriculaEncontrada[0].NameStudent,
            Primer_Apellido_Student: matriculaEncontrada[0].Primer_Apellido_Student,
            Segundo_Apellido_Student: matriculaEncontrada[0].Segundo_Apellido_Student,
            Email_Legal_Manager: matriculaEncontrada[0].Email_Legal_Manager
        }
    }

}
