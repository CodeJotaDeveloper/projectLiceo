

export const ValidacionCircular = (req, res) => {
    const {
        title,
        description,
        username,
        consecutivoCircular

    } = req.body;

    let mensaje = '';

    if (title === '') {
        mensaje += 'Es requirido el campo Titulo, '
    }
    if (description === '') {
        mensaje += 'Es requirido el campo descripción, '
    }
    if (username === '') {
        mensaje += 'Es requirido el campo del nombre del usuario, '
    }
    if (consecutivoCircular === '') {
        mensaje += 'Es requirido el campo del consecutivo de la circular, '
    }



    return mensaje;
}


