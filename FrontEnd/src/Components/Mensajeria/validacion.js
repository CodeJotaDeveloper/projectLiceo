
/**
 * Permite poder validar un string que tiene espacios en blanco
 * @param {string} valor 
 * @returns true si son espacios en blanco y false en caso contrario
 */
export const textoTieneEspaciosVacio = function (valor) {

    const dato = valor.trim();
    if (dato.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const textoEmailTieneEspaciosVacio = function (valor) {

    if (valor.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const enteroEsCero = (valor) => {
    if (valor === 0) {
        return true;
    } else {
        return false;
    }
}