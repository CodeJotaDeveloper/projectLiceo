import Swal from 'sweetalert2';

/**
 * Mensajeria con el sweegar
 * @param {Titulo del mensaje} titulo 
 * @param {Texto a mostrar} texto 
 * @param {Icono de exito o error} icono 
 */
export const sweetAlertMensaje = (titulo, texto, icono) => {
    //icono => 'success'  'warning' 'error' 'info' 'question'
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        timer: 10000,
        position: 'center',
        confirmButtonText: 'Aceptar'
    });

}
