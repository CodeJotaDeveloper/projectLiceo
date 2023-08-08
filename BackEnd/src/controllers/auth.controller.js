import User from '../models/User'
import Jwt from 'jsonwebtoken';
import config from '../config';
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { usuarioRolAAsignar, usuarioConNuevosRoles } from '../middlewares/ValidacionUser' //Rol a asignar
import { enviarCorreoConfirmacionRegistrarse } from '../middlewares/envioEmailRegistrarse';
var validator = require("email-validator");



/**Permite poder hacer el registro del nuevo usuario */
export const signUp = async (req, res) => {
    var { username, cedula, email, password } = req.body;
    email = email.trim();
    var dataJSON = {};
    let roles = [];

    if (!username) { //Caso donde no se envia el username
        setError(true); setData([]); setMessage("El username se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }
    if (!cedula) { //Caso donde no se envia el username
        setError(true); setData([]); setMessage("La cédula se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }

    if (!email) { //Caso donde no se envia el correo
        setError(true); setData([]); setMessage("El correo se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }

    if (email) { //Caso donde se envia el correo y es incorrecto.
        if (!validator.validate(email)) {
            setError(true); setData([]); setMessage("El correo no cumple el formato correcto.");
            return res.status(400).json(getJSON());
        }
    }

    if (!password) { //Caso donde no se envia el passport
        setError(true); setData([]); setMessage("El password se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }

    const exiteUsuario = await User.findOne({ email });

    if (exiteUsuario) { //Caso donde ya existe el correo del usuario en la base de datos
        setError(true); setData(exiteUsuario); setMessage("Ya el usuario existe con ese correo => " + email);
        return res.status(400).json(getJSON());
    }

    const nombreRol = usuarioRolAAsignar(email);//Rol A asignar

    //Verificamos si es diferente de vacio
    if (nombreRol.length > 0) {
        roles.push(nombreRol);
        dataJSON.rol = roles;
    }
    let newUser = new User({
        username,
        cedula,
        email,
        password: await User.encryptPassword(password)
    });
    newUser = await usuarioConNuevosRoles(roles, newUser);//Asigna los nuevos roles
    const savedUser = await newUser.save();
    const token = Jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 1500 //25 minutos es igual a 1500 segundos        
    })

    dataJSON.token = token;
    dataJSON.user = savedUser; // Traer dato del registro en JSON .

    setData(dataJSON); setError(false); setMessage("Exito");
    enviarCorreoConfirmacionRegistrarse(savedUser)

    return res.status(200).json(getJSON())
}

/**Permite poder logear al usuario registrado en la base de datos */
export const signIn = async (req, res) => {

    const { email, password } = req.body;


    if (!email) { //Caso donde no se envia el correo
        setError(true); setData([]); setMessage("El correo se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }

    if (!password) { //Caso donde no se envia el password
        setError(true); setData([]); setMessage("El password se debe enviar como parametro, por ser requerido.");
        return res.status(400).json(getJSON());
    }

    const userFound = await User.findOne({ email }).populate("roles") //busca el usuario por el correo
    //Populate me permite ver que tienen los roles adentro.
    if (!userFound) {// validacion correo no existe
        setError(true); setData([]); setMessage("User not found");
        return res.status(400).json(getJSON());


    }

    const matchPassword = await User.comparePassword(password, userFound.password)

    if (!matchPassword) { //Error las contraseñas no considen
        setError(true); setData([{ token: null }]); setMessage("Invalid password");
        return res.status(401).json(getJSON())
    }


    const token = Jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    setError(false); setData({ token, ...userFound._doc }); setMessage("Exito");
    return res.status(200).json(getJSON())
}






