require('dotenv').config(); //Esto permite usar las variables del entorno
const nodemailer = require('nodemailer')

export const enviarCorreoConfirmacionContacto = async (contactSaved) => {
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
        to: contactSaved.email,
        subject: `Liceo La Virgen Solicitud de contacto (${contactSaved.request}).`,
        html: `
            <div style="display: grid; justify-content: center; align-items: center;">
            <p style="color:coral; font-family: Arial, Helvetica, sans-serif; font-size: 25px;">SOLICITUD DE CONTACTO </p>
            <div>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Estimado usuario, se ha creado la solicitud de contacto (${contactSaved.request}).</p>
                <b><p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;"></p></b>
                <b><p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Los datos recidos en su solicitud son: </p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula: ${contactSaved.cedula}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre: ${contactSaved.name}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer apellido: ${contactSaved.primerApellido}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo apellido: ${contactSaved.segundoApellido}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Correo electrónico: ${contactSaved.email}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Teléfono: ${contactSaved.phone}</p>                
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Estado de su solicitud: ${contactSaved.status}</p>


                <p style="font-size: 15px; font-family: Arial, Helvetica, sans-serif;"></p>

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

export const enviarCorreoActualizacionContacto = async (contactSaved) => {
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
        to: contactSaved.email,
        subject: `Liceo La Virgen Solicitud de contacto (${contactSaved.request}).`,
        html: `
            <div style="display: grid; justify-content: center; align-items: center;">
            <p style="color:coral; font-family: Arial, Helvetica, sans-serif; font-size: 25px;">ACTUALIZACIÓN SOLICITUD DE CONTACTO </p>
            <div>
                <p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Estimado usuario, se ha actualizado la solicitud de contacto (${contactSaved.request}).</p>
                <b><p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">El estado de su solicitud es: ${contactSaved.status}</p></b>
                <b><p style="font-size: 23px; font-family: Arial, Helvetica, sans-serif;">Los datos recidos en su solicitud son: </p></b>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Cédula: ${contactSaved.cedula}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Nombre: ${contactSaved.name}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Primer apellido: ${contactSaved.primerApellido}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Segundo apellido: ${contactSaved.segundoApellido}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Correo electrónico: ${contactSaved.email}</p>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Teléfono: ${contactSaved.phone}</p>                
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Motivo: ${contactSaved.motivo}</p>


                <p style="font-size: 15px; font-family: Arial, Helvetica, sans-serif;"></p>

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


