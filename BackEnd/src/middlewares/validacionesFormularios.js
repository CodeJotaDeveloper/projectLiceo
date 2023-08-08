
export const validarFormularioPrematricula = (req, res) => {

    const {
        NameStudent,
        Primer_Apellido_Student,
        Segundo_Apellido_Student,
        fecha_nacimiento_iso,
        Cedula_Student,
        Gender_Student,
        Nacionalidad_Student,
        Institucion_Procedencia_Student,


        Name_Legal_Manager,
        Primer_Apellido_Legal_Manager,
        Segundo_Apellido_Legal_Manager,
        Number_Phone_Legal_Manager,
        Email_Legal_Manager,
        Cedula_Legal_Manager,
        Ocupacion_Legal_Manager,


        Gender_Legal_Manager,
        Nacionalidad_Legal_Manager,
        Relationship_Legal_Manager,
        fecha_nacimiento_Legal_Manager_iso,
        Address_Legal_Manager,
        username,

        cedStudentPhotoFrontal,
        cedStudentPhotoDorsal,
        cedManagerPhotoFrontal,
        cedManagerPhotoDorsal,
        reciboDireccion,
        poliza

    } = req.body;

    let mensaje = '';

    if (NameStudent === '') {
        mensaje += 'Es requerido el Nombre del Estudiante,  ';
    }
    if (Primer_Apellido_Student === '') {
        mensaje += 'Es requerido el Primer Apellido del estudiante, ';
    }
    if (Segundo_Apellido_Student === '') {
        mensaje += 'Es requerido el Segundo Apellido del estudiante, ';
    }
    if (fecha_nacimiento_iso === '') {
        mensaje += 'Es requerida la fecha de nacimiento del estudiante, ';
    }
    if (Cedula_Student === '') {
        mensaje += 'Es requerida la cédula del estudiante, ';
    }

    if (cedStudentPhotoFrontal === '') {
        mensaje += 'Es requerido la foto frontal de la cédula del estudiante, ';
    }

    if (cedStudentPhotoDorsal === '') {
        mensaje += 'Es requerido la foto dorsal de la cédula del estudiante, ';
    }

    if (Gender_Student === '') {
        mensaje += 'Es requerido el género del estudiante, ';
    }
    if (Nacionalidad_Student === '') {
        mensaje += 'Es requerido la nacionalidad del estudiante, ';
    }
    if (Institucion_Procedencia_Student === '') {
        mensaje += 'Es requerida la institución de procedencia del estudiante, ';
    }

    //Mensajes Encargado legal
    if (Name_Legal_Manager === '') {
        mensaje += 'Es requerido el Nombre del encargado legal del estudiante, ';
    }
    if (Primer_Apellido_Legal_Manager === '') {
        mensaje += 'Es requerido el Primer Apellido del encargado legal del estudiante, ';
    }
    if (Segundo_Apellido_Legal_Manager === '') {
        mensaje += 'Es requerido el Segundo Apellido del encargado legal del estudiante, ';
    }
    if (Number_Phone_Legal_Manager === '') {
        mensaje += 'Es requerido el Número de teléfono del encargado legal del estudiante, ';
    }
    if (Email_Legal_Manager === '') {
        mensaje += 'Es requerido el email del encargado legal del estudiante, ';
    }
    if (Ocupacion_Legal_Manager === '') {
        mensaje += 'Es requerido la ocupacion del encargado legal del estudiante, ';
    }
    if (Cedula_Legal_Manager === '') {
        mensaje += 'Es requerido el número de cédula del encargado legal del estudiante, ';
    }


    if (cedManagerPhotoFrontal === '') {
        mensaje += 'Es requerido la foto frontal de la cédula del encargado legal del estudiante, ';
    }
    if (cedManagerPhotoDorsal === '') {
        mensaje += 'Es requerido la foto dorsal del encargado legal del estudiante, ';
    }


    if (Gender_Legal_Manager === '') {
        mensaje += 'Es requerido el genero del encargado legal del estudiante, ';
    }
    if (Nacionalidad_Legal_Manager === '') {
        mensaje += 'Es requerido la nacionalida del encargado legal del estudiante, ';
    }

    if (Relationship_Legal_Manager === '') {
        mensaje += 'Es requerido el parentesco  del encargado legal del estudiante, ';
    }

    if (Address_Legal_Manager === '') {
        mensaje += 'Es requerido la dirección del encargado legal del estudiante, ';
    }


    if (reciboDireccion === '') {
        mensaje += 'Es requerido una foto de un recibo que tenga la dirección de residencia, ';
    }

    if (poliza === '') {
        mensaje += 'Es requerido la foto de la poliza del estudiante, ';
    }


    if (fecha_nacimiento_Legal_Manager_iso === '') {
        mensaje += 'Es requerido la fecha de nacimiento del encargado legal del estudiante,';
    }

    if (username === '') {
        mensaje += 'Es requerido el usarname, ';
    }

    return mensaje;



}