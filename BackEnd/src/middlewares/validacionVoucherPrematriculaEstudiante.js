import Prematricula from "../models/Prematricula";

//Este metodo es para devolver datos especificos de la coleccion prematricula en JSON
export const VoucherPrematriculaEstudiante = async function (usuarioCedula) {
    const date = new Date();
    const year = date.getFullYear();
    const matriculaEncontrada = await Prematricula.find({ Cedula_Student: usuarioCedula, Period: year });


    if (matriculaEncontrada.length === 0) {
        return {};

    } else {
        return {
            id: matriculaEncontrada[0]._id,
            createdAt: matriculaEncontrada[0].createdAt,
            Period: matriculaEncontrada[0].Period,
            Cedula_Student: usuarioCedula,
            NameStudent: matriculaEncontrada[0].NameStudent,
            Primer_Apellido_Student: matriculaEncontrada[0].Primer_Apellido_Student,
            Segundo_Apellido_Student: matriculaEncontrada[0].Segundo_Apellido_Student,
            fecha_nacimiento_iso: matriculaEncontrada[0].fecha_nacimiento_iso,
            Institucion_Procedencia_Student: matriculaEncontrada[0].Institucion_Procedencia_Student,
            Email_Legal_Manager: matriculaEncontrada[0].Email_Legal_Manager,
            Cedula_Legal_Manager: matriculaEncontrada[0].Cedula_Legal_Manager,
            Name_Legal_Manager: matriculaEncontrada[0].Name_Legal_Manager,
            Primer_Apellido_Legal_Manager: matriculaEncontrada[0].Primer_Apellido_Legal_Manager,
            Segundo_Apellido_Legal_Manager: matriculaEncontrada[0].Segundo_Apellido_Legal_Manager,
            Number_Phone_Legal_Manager: matriculaEncontrada[0].Number_Phone_Legal_Manager,
            Address_Legal_Manager: matriculaEncontrada[0].Address_Legal_Manager
            // username: matriculaEncontrada[0].username
        }
    }

}



export const LegalGuardianEnrollment = async function (usuarioCedula) {
    const date = new Date();
    const year = date.getFullYear();
    let arrayEstudiante = [];
    const legalEnrollment = await Prematricula.find(
        {
            Cedula_Legal_Manager: usuarioCedula,
            Period: year
            //Agregar un menos -1 despuede de year, el encargado legal consulta con la prematrícula del año anterior.

        }
    );



    if (legalEnrollment.length === 0) {
        return {};

    } else {
        legalEnrollment.forEach(student => {
            arrayEstudiante.push({
                Cedula_Student: student.Cedula_Student,
                Period: student.Period,
                NameStudent: student.NameStudent + " " + student.Primer_Apellido_Student + " " + student.Segundo_Apellido_Student,
            })
        });
        return arrayEstudiante

    }

}
