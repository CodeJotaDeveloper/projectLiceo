require('dotenv').config(); //Esto permite usar las variables del entorno
const nodemailer = require('nodemailer')

export const emailPrematriculaeliminada = async (prematriculaSaved) => {
    const config = {
        host: process.env.correo_host,
        port: process.env.correo_port,
        auth: {
            user: process.env.correo_user,
            pass: process.env.correo_pass
        }
    }
    //Segundo envio de correro
    /*
    from: process.env.correo_user,
            to: prematriculaSaved.Email_Legal_Manager,
            */

    const mensaje = {


        from: process.env.correo_user,
        to: 'jvilla252@gmail.com, yeka.prueba27@gmail.com',//Definir a que correo electronico se envia una prematrícula eliminada.
        subject: `Liceo La Virgen Prematrícula Elimanada periodo: ${prematriculaSaved.Period}.`,
        html: `
            <div style="display: grid; justify-content: center; align-items: center;">
            <p style="color:coral; font-family: Arial, Helvetica, sans-serif; font-size: 25px;">PREMATRICULA ELIMINADA </p>
            <div>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Estimado(a) ${prematriculaSaved.Name_Legal_Manager}, el proceso de prematricula se encuentra en estado (Eliminado).</p>
                <b><p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Los datos recidos en su prematrícula son: </p></b>
                <b><p style="font-size: 22px; font-family: Arial, Helvetica, sans-serif;">Datos del estudiante</p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula del estudiante: ${prematriculaSaved.Cedula_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre  del estudiante: ${prematriculaSaved.NameStudent}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer apellido  del estudiante: ${prematriculaSaved.Primer_Apellido_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo apellido  del estudiante: ${prematriculaSaved.Segundo_Apellido_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Fecha de nacimiento del estudiante: ${prematriculaSaved.fecha_nacimiento_iso}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Genero del estudiante: ${prematriculaSaved.Gender_Student}</p>                
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nacionalidad del estudiante: ${prematriculaSaved.Nacionalidad_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Institución de procedencia del estudiante: ${prematriculaSaved.Institucion_Procedencia_Student}</p>
                <b><p style="font-size: 22px; font-family: Arial, Helvetica, sans-serif;">Datos del encargado legal</p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre del encargado legal: ${prematriculaSaved.Name_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer Apellido del encargado legal: ${prematriculaSaved.Primer_Apellido_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo Apellido del encargado legal: ${prematriculaSaved.Segundo_Apellido_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula del encargado legal: ${prematriculaSaved.Cedula_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Teléfono del encargado legal: ${prematriculaSaved.Number_Phone_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Correo electrónico del encargado legal: ${prematriculaSaved.Email_Legal_Manager}</p
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Ocupación del encargado legal: ${prematriculaSaved.Ocupacion_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Género del encargado legal: ${prematriculaSaved.Gender_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nacionalidad del encargado legal: ${prematriculaSaved.Nacionalidad_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Parentesco del encargado legal: ${prematriculaSaved.Relationship_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Dirección del encargado legal: ${prematriculaSaved.Address_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Fecha Nacimiento del encargado legal: ${prematriculaSaved.fecha_nacimiento_Legal_Manager_iso}</p>
                
                <p style="font-size: 25px; font-family: Arial, Helvetica, sans-serif;">Si tiene más consultas puede comunicarse al Liceo La Virgen </p>

                </div>
            <!-- <p style="color:#023e8a; font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Liceo La Virgen</p> -->
            <div style="display: flex; justify-content: space-between; width: 500px; background-color:  #ced4da; ">
                
                <div style="padding: 10px;">
                
                    <img src="cid:LogoMep" width="80px"; />
                    <img src="cid:logoInnovacion" width="80px"; />
                    <img src="cid:logoLiceo" width="80px"; />  
                </div>
                <div style="padding: 10px;">
                    <p style="font-family: Arial, Helvetica, sans-serif; text-align: center;">Información</p>
                    <p style="font-family: Arial, Helvetica, sans-serif;"> Fb
                        <a href='https://www.facebook.com/lielv'>
                            Liceo La Virgen de Sarapiquí
                        </a>
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif;">
                        Teléfono: 2459 1100
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif;">
                        Correo: lic.lavirgen@mep.go.cr
                    </p>
                </div>
            </div>
        </div>
        `,
        attachments: [
            {
                filename: 'logoLiceo.png',
                path: 'src/public/storage/assets/logoLiceo.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'logoLiceo' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
            {
                filename: '198247-logos-01.png',
                path: 'src/public/storage/assets/198247-logos-01.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'LogoMep' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
            {
                filename: 'innovacion-01-274x300.png',
                path: 'src/public/storage/assets/innovacion-01-274x300.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'logoInnovacion' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
        ]


    }

    const transpor = nodemailer.createTransport(config);

    const info = await transpor.sendMail(mensaje);
    // console.log(info);
}

export const enviarCorreoActualizacionPrematricula = async (prematriculaSaved) => {
    const config = {
        host: process.env.correo_host,
        port: process.env.correo_port,
        auth: {
            user: process.env.correo_user,
            pass: process.env.correo_pass
        }
    }
    //Segundo envio de correro

    const mensaje = {
        from: process.env.correo_user,
        to: prematriculaSaved.Email_Legal_Manager,
        subject: `Liceo La Virgen Proceso de Actualización de Prematrícula periodo: ${prematriculaSaved.Period}.`,
        html: `
            <div style="display: grid; justify-content: center; align-items: center;">
            <p style="color:coral; font-family: Arial, Helvetica, sans-serif; font-size: 25px;">PROCESO DE ACTUALIZACIÓN DE PREMATRÍCULA </p>
            <div>
                <p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Estimado(a) ${prematriculaSaved.Name_Legal_Manager} el proceso de prematrícula se encuentra en estado (${prematriculaSaved.status}) por motivo: ${prematriculaSaved.motivo}</p>
                <b><p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Los datos recidos en su prematrícula son: </p></b>
                <b><p style="font-size: 22px; font-family: Arial, Helvetica, sans-serif;">Datos del estudiante</p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula del estudiante: ${prematriculaSaved.Cedula_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre  del estudiante: ${prematriculaSaved.NameStudent}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer apellido  del estudiante: ${prematriculaSaved.Primer_Apellido_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo apellido  del estudiante: ${prematriculaSaved.Segundo_Apellido_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Fecha de nacimiento del estudiante: ${prematriculaSaved.fecha_nacimiento_iso}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Género del estudiante: ${prematriculaSaved.Gender_Student}</p>                
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nacionalidad del estudiante: ${prematriculaSaved.Nacionalidad_Student}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Institución de procedencia del estudiante: ${prematriculaSaved.Institucion_Procedencia_Student}</p>
                <b><p style="font-size: 22px; font-family: Arial, Helvetica, sans-serif;">Datos del encargado legal</p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre del encargado legal: ${prematriculaSaved.Name_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer Apellido del encargado legal: ${prematriculaSaved.Primer_Apellido_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo Apellido del encargado legal: ${prematriculaSaved.Segundo_Apellido_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula del encargado legal: ${prematriculaSaved.Cedula_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Teléfono del encargado legal: ${prematriculaSaved.Number_Phone_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Correo electrónico del encargado legal: ${prematriculaSaved.Email_Legal_Manager}</p
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Ocupación del encargado legal: ${prematriculaSaved.Ocupacion_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Género del encargado legal: ${prematriculaSaved.Gender_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nacionalidad del encargado legal: ${prematriculaSaved.Nacionalidad_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Parentesco del encargado legal: ${prematriculaSaved.Relationship_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Direción del encargado legal: ${prematriculaSaved.Address_Legal_Manager}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Fecha Nacimiento del encargado legal: ${prematriculaSaved.fecha_nacimiento_Legal_Manager_iso}</p>
                
                <p style="font-size: 25px; font-family: Arial, Helvetica, sans-serif;">Si tiene más consultas puede comunicarse al Liceo La Virgen </p>

                </div>
            <!-- <p style="color:#023e8a; font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Liceo La Virgen</p> -->
            <div style="display: flex; justify-content: space-between; width: 500px; background-color:  #ced4da; ">
                
                <div style="padding: 10px;">
                
                    <img src="cid:LogoMep" width="80px"; />
                    <img src="cid:logoInnovacion" width="80px"; />
                    <img src="cid:logoLiceo" width="80px"; />  
                </div>
                <div style="padding: 10px;">
                    <p style="font-family: Arial, Helvetica, sans-serif; text-align: center;">Información</p>
                    <p style="font-family: Arial, Helvetica, sans-serif;"> Fb
                        <a href='https://www.facebook.com/lielv'>
                            Liceo La Virgen de Sarapiquí
                        </a>
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif;">
                        Teléfono: 2459 1100
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif;">
                        Correo: lic.lavirgen@mep.go.cr
                    </p>
                </div>
            </div>
        </div>
        `,
        attachments: [
            {
                filename: 'logoLiceo.png',
                path: 'src/public/storage/assets/logoLiceo.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'logoLiceo' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
            {
                filename: '198247-logos-01.png',
                path: 'src/public/storage/assets/198247-logos-01.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'LogoMep' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
            {
                filename: 'innovacion-01-274x300.png',
                path: 'src/public/storage/assets/innovacion-01-274x300.png', // path contains the filename, do not just give path of folder where images are reciding.
                cid: 'logoInnovacion' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
            },
        ]


    }

    const transpor = nodemailer.createTransport(config);

    const info = await transpor.sendMail(mensaje);
    // console.log(info);
}


