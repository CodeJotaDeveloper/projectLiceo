export const ValidacionPost = (req, res) => {
    const {
        title,
        description,
        imgUrl,
        username
    } = req.body;

    let mensaje = '';

    if (title === '') {
        mensaje += 'Es requerido el campo titulo de la noticia, ';
    }
    if (description === '') {
        mensaje += 'Es requerido el campo descripción de la noticia, '
    }
    if (imgUrl === '') {
        mensaje += 'Es requerido el campo imagen, '
    }
    if (username === '') {
        mensaje += 'Es requirido el campo usuario, '
    }

    return mensaje;
}