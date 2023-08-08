var data = [];
var menssage = "";
var error = false;

/**
 * Permite poder asignar el mensaje al JSON
 * @param {string} nuevoMensaje mensaje tipo texto para el front-end
 */
export function setMessage(nuevoMensaje) {
    menssage = "";
    menssage = nuevoMensaje;
}



/**
 * Permite poder asignar el error del mensaje JSON
 * @param {boolean} nuevoError tipo true o false
 */
export function setError(nuevoError) {
    error = false;
    error = nuevoError;
}

/**
 * Permite poder asingar la nueva data del JSON
 * @param {object} nuevaData objeto obtenido de la DB
 */
export function setData(nuevaData) {
    data = [];
    data = nuevaData;
}

/**
 * permite poder exportar el json creado
 * @returns Objeto de formato JSON para el front-end
 */
export function getJSON() {
    return {
        mensaje: menssage,
        error: error,
        data: data

    };
}