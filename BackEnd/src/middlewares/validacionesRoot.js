import Estados from "../models/Estados";
import Role from "../models/Role";
import User from "../models/User";

//Este metodo sirve para traer el nombre de los estados de la coleccion Estados
export const ListaEstados = async function (listaEstadosId) {
    let listaEstados;
    if (listaEstadosId) {
        const nombreEstados = await Estados.find({ _id: { $in: listaEstadosId } })// buscar el nombre en todas las colecciones buscar el rol
        listaEstados = nombreEstados.map(function (element) {
            return element.estado
        })
    }
    return listaEstados;
}

//Este metodo sirve para traer el nombre de los roles de la coleccion de Roles por el Id del rol
const ListaNombresRoles = async function (listaRolesId) {

    let listaRolesNombre;
    if (listaRolesId) {
        const nombreRoles = await Role.find({ _id: { $in: listaRolesId } })// buscar el nombre en todas las colecciones buscar el rol
        listaRolesNombre = nombreRoles.map(function (element) {
            return element.name
        })
    }
    return listaRolesNombre;
}

//Este metodo sirve para traer el nombre de los estados de la coleccion Roles
export const UsuarioParaRoot = async function (UsuarioId) {

    const lusuario = await User.findById(UsuarioId);
    const rolesNombres = await ListaNombresRoles(lusuario.roles);

    return {
        id: UsuarioId,
        username: lusuario.username,
        email: lusuario.email,
        roles: rolesNombres
    }
}


