import TeacherAttendance from "../models/TeacherAttendance"// Importar la base de datos de contacto
import { ValidacionTeacherAttendance } from "../middlewares/ValidacionTeacherAttendance";

import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { enviarCorreoConfirmacionContacto, } from '../middlewares/envioEmailTeacherAttendance';


export const createAttendance = async (req, res) => {
    const msgError = ValidacionTeacherAttendance(req, res);

    try {
        if (msgError.length > 0) {
            setError(true); setMessage(msgError); setData([]);
            return res.status(200).json(getJSON());


        } else {
            const {
                Cedula_Student,
                NameStudent,
                Primer_Apellido_Student,
                Segundo_Apellido_Student,
                fecha,
                subject,
                absence,
                cantidad,
                emailTeacher,
                emailLegalManager
            } = req.body
            const newTeacherAttendance = new TeacherAttendance({
                Cedula_Student,
                NameStudent,
                Primer_Apellido_Student,
                Segundo_Apellido_Student,
                fecha,
                subject,
                absence,
                cantidad,
                emailTeacher,
                emailLegalManager

            });

            const TeacherAttendanceSaved = await newTeacherAttendance.save()

            //Metodo externo que se utiliza para enviar el correo electronico de recuperacion.
            enviarCorreoConfirmacionContacto(TeacherAttendanceSaved)
            setMessage("Exito"); setData(TeacherAttendanceSaved); setError(false);
            return res.status(200).json(getJSON());

        }
    } catch (e) {
        setMessage("Error"); setData(e.message); setError(true);
        return res.status(500).json(getJSON());
    }
}




