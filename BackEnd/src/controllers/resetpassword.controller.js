import User from '../models/User'
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
var generator = require('generate-password');
import { enviarCorreoRecuperarClave } from '../middlewares/envioEmail';

export const existecorreo = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        setError(true); setMessage("Error"); setData({ message: "Es requerido que envie el correo electronico." });
        return res.status(400).json(getJSON());
    }
    const user = await User.findOne({ email: email })

    //En caso de que el correo recibido no esta en la BD.
    if (!user) {
        setError(true); setMessage("Error"); setData({ message: "Error el correo ingresado no exite: " + email });
        return res.status(400).json(getJSON());
    }

    var password = generator.generate({
        length: 10,
        numbers: true
    });

    const updateUser = await User.findByIdAndUpdate(
        user._id,
        { password: await User.encryptPassword(password) },
        { new: true }
    );

    //En caso de que el sistema no pueda actualizar la clave del usuario.
    if (!updateUser) {
        setError(true); setMessage("Error"); setData({ message: "Error no se puede generar la nueva clave" });
        return res.status(400).json(getJSON());
    }

    //Metodo externo que se utiliza para enviar el correo electronico de recuperacion.
    enviarCorreoRecuperarClave(user.email, password);

    setError(false); setMessage("Exito"); setData(updateUser);
    return res.status(200).json(getJSON());
}

