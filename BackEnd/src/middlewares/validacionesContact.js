export const ValidacionContact = (req, res) => {
    const {

        cedula,
        name,
        primerApellido,
        segundoApellido,
        email,
        phone,
        request
    } = req.body;

    let mensaje = '';

    let ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    //Evaluación de Cadena Valida de Solo Letras 



    if (cedula === '') {
        mensaje += 'Es requirido el campo cédula, '
    }
    if (name === '') {
        mensaje += 'Es requirido el campo nombre, '
    }
    if (!name.match(ExpRegSoloLetras)) {
        mensaje += 'Solo se permiten letras en el campo nombre, ';
    }
    if (primerApellido === '') {
        mensaje += 'Es requirido el campo primer apellido, '
    }
    if (!primerApellido.match(ExpRegSoloLetras)) {
        mensaje += 'Solo se permiten letras en el primer apellido, ';
    }
    if (segundoApellido === '') {
        mensaje += 'Es requirido el segundo apellido, '
    }
    if (!segundoApellido.match(ExpRegSoloLetras)) {
        mensaje += 'Solo se permiten letras en el segundo apellido, ';
    }
    if (email === '') {
        mensaje += 'Es requirido el campo correo electrónico, '
    }
    if (phone === '') {
        mensaje += 'Es requirido el campo teléfono, '
    }
    if (!/^([0-9])*$/.test(phone)) {
        mensaje += 'El campo teléfono solo permite números, '
    }
    if (request === '') {
        mensaje += 'Es requirido el campo tipo de solicitud. '
    }

    return mensaje;
}


