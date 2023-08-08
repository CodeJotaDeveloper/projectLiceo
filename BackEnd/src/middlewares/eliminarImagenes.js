/**
 * Metodo que me permite poder hacer la eliminación del archivo en DB
 * @param {ruta a eliminar} filePath 
 */
const eliminarImagenLocal = (filePath) => {
    const fs = require('fs');
    filePath = "src/public" + filePath;
    fs.access(filePath, (error) => {
        if (!error) {
            fs.unlinkSync(filePath);
        } else {
            console.error('Error Ocurred', error)
        }
    })

}
/**
 * Permite poder gestionar el proceso de eliminación
 * @param {Proporcionada por la base de datos} ruta 
 * @param {Por vaiables de entorno } puerto 
 */
export const procesarEliminacion = (ruta, puerto) => {
    //Dividir la ruta de la imagen para cedula estudiante frontal.
    let vector = ruta + puerto;
    let vectorSplict = vector.split(puerto);
    eliminarImagenLocal(vectorSplict[1]);//Se procede a eliminar el archivo local.
}

