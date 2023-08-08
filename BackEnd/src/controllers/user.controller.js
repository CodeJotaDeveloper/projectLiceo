import User from "../models/User"
import { setData, setMessage, setError, getJSON } from '../models/crearJSON' //para poder crear el JSON
import { ValidacionUsuario, existeUsuario, usuarioConNuevosRoles, usuarioRolAAsignar } from "../middlewares/ValidacionUser";
/**Caso donde se crea un nuevo usuario */
//Este metodo permite que se puedan crear usuarios con el rol root
export const createUser = async (req, res) => {

    const mensajeError = ValidacionUsuario(req, res);

    if (mensajeError.length > 0) {//Se encontro un error en los datos
        setData([{ Errores: mensajeError }]); setError(true); setMessage("Error Hay datos requeridos ingresados incorrectamente");
        return res.status(400).json(getJSON())
    }
    const { username, email, password, profile } = req.body;

    const existe = await existeUsuario(req, res); //Metodo me retorna true si existe en la base de datos el usuario
    if (existe) { //Caso donde el usuario ya existe en la base de datos
        setData({ email: req.body.email }); setError(true); setMessage("Error el usuario ya existe en la base de datos");
        return res.status(400).json(getJSON())
    }

    //Caso donde si se puede registrar el usuario
    var dataJSON = {};
    let roles = [];
    let nombreRol = usuarioRolAAsignar(email);//Rol A asignar

    //Verificamos si es diferente de vacio
    if (nombreRol.length > 0) {
        roles.push(nombreRol);
        dataJSON.rol = roles;
    }
    let newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    newUser = await usuarioConNuevosRoles(roles, newUser);//Asigna los nuevos roles
    const savedUser = await newUser.save(); //Guarda el nuevo usuario en la base de datos

    dataJSON.token = null;
    dataJSON.user = savedUser; // Traer dato del registro en JSON .

    setData(dataJSON); setError(false); setMessage("Exito");
    return res.json(getJSON())
}

/**Busca un usuario por el ID inviado */
export const getUserById = async (req, res) => {
    // res.json('Get userbyid')   
    const idUser = req.params.id;

    if (!idUser) {//Caso donde no se envia el ID por el URL del usuario
        setData([]); setError(true); setMessage("Error el ID es requerido favor enviarlo");
        return res.status(400).json(getJSON())
    }

    try {
        const user = await User.findById(idUser)

        if (!user) { //Caso donde se manda el ID pero no existe en la base de datos
            setData([]); setError(true); setMessage("No existe un usuario con ese ID => " + idUser);
            return res.status(400).json(getJSON())
        }
        const { password, ...other } = user._doc
        setData(other); setError(false); setMessage("Exito");
        return res.status(200).json(getJSON())
    } catch (error) {
        setData(error); setError(false); setMessage("Error al buscar el usuario datos invalidos");
        return res.status(400).json(getJSON())
    }
}

/** Retorna todos los usuario de la base de datos */
export const getAllUser = async (req, res) => {
    const users = await User.find();//Busca todos los usuarios
    setData(users); setError(false); setMessage("Exito");
    return res.status(200).json(getJSON());


    // res.status(200).json(users)
}

/**Para poder actualizar información del usuario */
export const setUpdateUserById = async (req, res) => {
    const idUser = req.params.id;
    const { username, password, email, profile } = req.body;

    if (!idUser) {//Caso donde no se envia el ID por el URL del usuario
        setData([]); setError(true); setMessage("Error el ID es requerido favor enviarlo");
        return res.status(400).json(getJSON())
    }

    try {
        const user = await User.findById(idUser)

        if (!user) { //Caso donde se manda el ID pero no existe en la base de datos
            setData([]); setError(true); setMessage("No existe un usuario con ese ID => " + idUser);
            return res.status(400).json(getJSON())
        }
        //llenando el usuario para actualizar
        let usuarioActualizar = new User({
            username: "",
            email: "",
            password: "",
            profile: ""
        });

        if (!username) {
            usuarioActualizar.username = user.username;
        } else {
            usuarioActualizar.username = username;
        }

        if (!password) {
            usuarioActualizar.password = user.password;
        } else {
            usuarioActualizar.password = await User.encryptPassword(password);
        }

        if (!email) {
            usuarioActualizar.email = user.email;
        } else {
            usuarioActualizar.email = email;
        }

        if (!profile) {
            usuarioActualizar.profile = user.profile;
        } else {
            usuarioActualizar.profile = profile;
        }

        const DBuserUpdate = await User.findByIdAndUpdate(idUser,
            {
                username: usuarioActualizar.username,
                email: usuarioActualizar.email,
                password: usuarioActualizar.password,
                profile: usuarioActualizar.profile
            }, {
            new: true
        })

        setData(DBuserUpdate); setError(false); setMessage("Exito");
        return res.status(200).json(getJSON())
    } catch (error) {
        setData(error); setError(true); setMessage("Error al buscar el usuario datos invalidos");
        return res.status(400).json(getJSON())
    }
}