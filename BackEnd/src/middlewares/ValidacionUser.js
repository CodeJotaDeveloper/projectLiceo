import User from "../models/User";
import Role from "../models/Role";

/**Permite poder hacer validaciones para poder saber si los datos requeridos vienen con error */
export const ValidacionUsuario = (req, res) => {
    let mensaje = '';
    const { username, email, password, profile } = req.body;

    if (username === '') {
        mensaje += 'Es requerido el nombre del usuario, ';
    }
    if (email === '') {
        mensaje += 'Es requerido el correo del usuario, ';
    }
    if (password === '') {
        mensaje += 'Es requerido la contraseña, ';
    }
    return mensaje;
}

/**Metodo que retorna true si existe el usuario por email en la base de datos y falso en caso contrario */
export const existeUsuario = async (req, res) => {
    const { email } = req.body;
    const usuarioEncontrado = await User.findOne({ email });
    if (usuarioEncontrado) {
        return true;
    } else {
        return false;
    }
}

/**Permite poder retornar el nombre del rol por medio del correo */
export const usuarioRolAAsignar = (email) => {
    let rol = "";
    email = email.trim();
    var divideEmail = email + "@";
    const vector = divideEmail.split("@");

    if (email === 'jota@mep.go.cr') { //Solo para el root principal
        rol = 'Root';
    } else {//Cualquier otras validaciones 

        if (vector[1] === "est.mep.go.cr") {//estudiante
            rol = 'Estudiante';
        } else if (vector[1] !== "mep.go.cr") { //Encargado legal
            rol = 'Encargado Legal';
        }
    }
    return rol;
}

/**Permite poder retornar el usuario con los nuevos roles */
export const usuarioConNuevosRoles = async (roles, newUser) => {

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })// buscar el nombre en todas las colecciones buscar el rol
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "Estudiante" }) // Asignar rol por defecto
        newUser.roles = [role._id];
    }
    return newUser;
}