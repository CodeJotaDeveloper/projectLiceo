
export const ValidacionTeacherAttendance = (req, res) => {
    const {

        cedula,
        NameStudent,
        Primer_Apellido_Student,
        Segundo_Apellido_Student,
        fecha,
        subject,
        absence,
        cantidad,

    } = req.body;

    let mensaje = '';

    if (cedula === '') {
        mensaje += 'Es requirido el campo cédula.'
    }

    if (NameStudent === '') {
        mensaje += 'Es requirido el campo nombre.'
    }


    if (Primer_Apellido_Student === '') {
        mensaje += 'Es requirido el campo primer apellido.'
    }
    if (Segundo_Apellido_Student === '') {
        mensaje += 'Es requirido el segundo apellido.'
    }
    if (fecha === '') {
        mensaje += 'Es requirido el campo fecha.'
    }

    if (!/^([0-9])*$/.test(cantidad)) {
        mensaje += 'El campo cantidad solo permite números.'
    }
    if (subject === '') {
        mensaje += 'Es requirido el campo tipo de asignatura.'
    }
    if (absence === '') {
        mensaje += 'Es requirido el campo tipo de ausencia.'
    }

    return mensaje;
}