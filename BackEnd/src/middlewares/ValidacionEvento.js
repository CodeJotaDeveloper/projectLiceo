

export const ValidacionEvento = (req, res) => {
    const {
        title,
        organizacion,
        lugar,
        fecha,
        description,
        eventImag,
        username,


    } = req.body;

    let mensaje = '';

    if (title === '') {
        mensaje += 'Es requirido el campo Titulo,' + '\n'
    }
    if (organizacion === '') {
        mensaje += 'Es requirido el campo Organizacion,' + '\n'
    }
    if (lugar === '') {
        mensaje += 'Es requirido el campo Lugar, \n'
    }
    if (fecha === '') {
        mensaje += 'Es requirido el campo fecha, \n'
    }
    if (description === '') {
        mensaje += 'Es requirido el campo descripción, \n'
    }
    if (eventImag === '') {
        mensaje += 'Es requirido el campo imagen del evento, \n'
    }
    if (username === '') {
        mensaje += 'Es requirido el campo del nombre del usuario, \n'
    }

    return mensaje;
}


