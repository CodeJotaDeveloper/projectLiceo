require('dotenv').config(); //Esto permite usar las variables del entorno
const nodemailer = require('nodemailer')

export const enviarCorreoConfirmacionRegistrarse = async (savedUser) => {

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
        to: savedUser.email,
        subject: 'Liceo La Virgen-Registro de usuario en la aplicación web.',
        html: `
            <div style="display: grid; justify-content: center; align-items: center;">
            <p style="color:coral; font-family: Arial, Helvetica, sans-serif; font-size: 25px;">CREACIÓN DE CUENTA DE FORMA CORRECTA</p>
            <div>
                <p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Estimado(a) ${savedUser.username}, se ha registrado de forma exitosa en la aplicación del Liceo La Virgen.</p>
                <b><p style="font-size: 20px; font-family: Arial, Helvetica, sans-serif;">Con el correo electrónico: ${savedUser.email} </p></b>

              
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

