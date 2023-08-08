import User from "../models/User"
import Role from "../models/Role"
import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import { UsuarioParaRoot } from "../middlewares/validacionesRoot";


//Este metodo se puede eliminar
export const rootAddRoleUser = async (req, res) => {

    var { nameRole } = req.body; //parametro por body
    const userId = req.params.userId; //parametro por URL
    //console.log(req.body);
    //console.log("Rol: " + nameRole);
    //Validar que mandara el ID

    if (!userId) {
        setError(true); setMessage("No se envio el ID del usuario"); setData([]);
        return res.status(400).json(getJSON());
    }
    //  console.log("Name Role: " + nameRole)
    //Validar que el nombre del rol se mande y no llegue vacio
    if (!nameRole) {
        setError(true); setMessage("El nombre del rol no debe estar vacio."); setData([]);
        return res.status(400).json(getJSON());
    }

    const user = await User.findById(userId); //Buscar el usuario por ID
    //caso donde no hay usario encontrado por ese ID
    if (!user) {
        setError(true); setMessage("Usuario no encontrado, ID [ " + userId + " ]"); setData([]);
        return res.status(410).json(getJSON());
    }

    let vectorRole = []; //vector para actualizar
    vectorRole = user.roles; //asigna el vector de user a la variable
    const role = await Role.findOne({ name: nameRole }) // Encuentra el rol en la lista

    //Caso donde no se encuentra el rol, nombre incorrecto
    if (!role) {
        setError(true); setMessage("Error, no existe el nombre [ " + nameRole + " ] del ROL en la base de datos"); setData([]);
        return res.status(400).json(getJSON());
    }
    let existe = -1;//si es -1 no existe el rol
    existe = vectorRole.indexOf(role.id); //existe el rol para el usuario
    //existe el rol ya asignado al usuario
    if (existe >= 0) {
        setError(true); setMessage("El usuario posee ya el rol a asignar [ " + nameRole + " ]"); setData([]);
        return res.status(400).json(getJSON());
    }
    vectorRole.push(role._id); //agrega el rol en el vector
    const updateUser = await User.findByIdAndUpdate(userId, { roles: vectorRole }, { new: true });
    setError(false); setMessage("Exito"); setData(updateUser);
    return res.status(200).json(getJSON());
}

//Permite poder hacer la eliminación de un usuario en schema
export const getRootDeleteUserByID = async (req, res) => {
    const { userId } = req.params;
    //Validar que mandara el ID
    if (!userId) {
        setError(true); setMessage("No se envio el ID del usuario"); setData([]);
        return res.status(400).json(getJSON());
    }

    const UsuarioEliminado = await User.findByIdAndDelete(userId);
    //si el usuario no se pudo eliminar.
    if (!UsuarioEliminado) {
        setError(true); setMessage("No se encuentra el usuario ID [ " + userId + " ]"); setData([]);
        return res.status(400).json(getJSON());
    }
    //Caso donde si se elimino el usuario
    setError(false); setMessage("Exito"); setData(UsuarioEliminado);
    return res.status(200).json(getJSON());
}

//Permite un rol del usuario por el root
export const getRootDeleteRootUserByID = async (req, res) => {
    let nameRol = req.body;
    const userId = req.params.userId;


    //Validar que mandara el ID y no que llegue vacio
    if (!userId) {
        setError(true); setMessage("No se envio el ID del usuario"); setData([]);
        return res.status(400).json(getJSON());
    }

    //Validar que el nombre del rol se mande y no llegue vacio
    if (!nameRol) {
        setError(true); setMessage("El nombre del rol no debe estar vacio."); setData([]);
        return res.status(400).json(getJSON());
    }

    const UsuarioEncontrado = await User.findById(userId);//busca el usuario por el ID

    //si el usuario no se pudo encontrar 
    if (!UsuarioEncontrado) {
        setError(true); setMessage("No se encuentra el usuario para elimarle el ROL"); setData([]);
        return res.status(400).json(getJSON());
    }

    let vectorRole = []; //vector para actualizar
    vectorRole = UsuarioEncontrado.roles; //asigna el vector de user a la variable

    //buscar el ID del rol
    const role = await Role.findOne({ name: nameRol.roles }) // Encuentra el rol en la lista

    //no se encontro el rol por el nombre enviado 
    if (!role) {
        setError(true); setMessage("Error no se encontro el rol por ese nombre: " + nameRol.roles); setData([]);
        return res.status(400).json(getJSON());
    }

    let posicion = vectorRole.indexOf(role._id) //Asigna la posición a eliminar
    vectorRole.splice(posicion, 1) //con la posición elimina el rol

    const updateUser = await User.findByIdAndUpdate(
        userId,
        { roles: vectorRole },
        { new: true }
    );

    //Caso donde si se elimino el usuario 
    setError(false); setMessage("Exito"); setData(updateUser);
    return res.status(200).json(getJSON());
}


/** Retorna todos los usuario de la base de datos */
export const getAllUser = async (req, res) => {
    const users = await User.find();
    let listaUser = [];

    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        const objetoNuevo = await UsuarioParaRoot(element._id);
        // console.log(objetoNuevo)
        listaUser.push(objetoNuevo);

    }

    //Estructura JSON ordenada
    setData(listaUser); setError(false); setMessage("Exito");
    return res.status(200).json(getJSON());


}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    setData(user); setError(false); setMessage("Exito");
    return res.status(200).json(getJSON());
}

export const UpdateUserById = async (req, res) => {

    let nameRole = req.body; //parametro por body
    const userId = req.params.userId; //parametro por URL

    const user = await User.findById(userId); //Buscar el usuario por ID

    let vectorRole = []; //vector para actualizar
    vectorRole = user.roles; //asigna el vector de user a la variable
    const role = await Role.findOne({ name: nameRole.roles }) // Encuentra el rol en la lista

    //Caso donde no se encuentra el rol, nombre incorrecto
    if (!role) {
        setError(true); setMessage("Error, no existe el nombre [ " + nameRole.roles + " ] del ROL en la base de datos"); setData([]);
        return res.status(400).json(getJSON());
    }
    let existe = -1;//si es -1 no existe el rol
    existe = vectorRole.indexOf(role.id); //existe el rol para el usuario
    //existe el rol ya asignado al usuario
    if (existe >= 0) {
        setError(true); setMessage("El usuario posee ya el rol a asignar [ " + nameRole.roles + " ]"); setData([]);
        return res.status(400).json(getJSON());
    }
    vectorRole.push(role._id); //agrega el rol en el vector
    const updateUser = await User.findByIdAndUpdate(userId, { roles: vectorRole }, { new: true });
    setError(false); setMessage("Exito"); setData(updateUser);
    return res.status(200).json(updateUser)
    //return res.status(200).json(getJSON());


}