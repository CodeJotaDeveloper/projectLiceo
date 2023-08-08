//Sirve para confirmar que el usuario nos envien el token. Si estudiante administrador, etc
import config from "../config"
import Jwt from 'jsonwebtoken'
import User from "../models/User"
import Role from "../models/Role"
import { setMessage, setError, setData, getJSON } from "../models/crearJSON"

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = Jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: 'no user found' })

        next();// continuar en la ruta


    } catch (error) {
        res.status(401).json({ message: 'Unauthorrized' })
    }

}

export const isAdministratorOrRoot = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario administrador o root");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const roles = await Role.find({ _id: { $in: user.roles } })
    //console.log(roles);// Me permite ver el ID y el rol del usuario por consola
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Root" || roles[i].name === "Administrador") {
            next()
            return;
        }
    }
    setMessage("Requiere Administrator o Root rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())


}


// Validacion para que el rol administrador, profesor y encargado legal puedan hacer prematriculas
export const isRootAdministratorOrTeacherOrLegalManager = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario Encargado legal o administrador o profesor");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Encargado Legal" || roles[i].name === "Administrador" || roles[i].name === "Profesor" || roles[i].name === "Root") {
            next()
            return;
        }
    }
    setMessage("Requiere Administrador o Profesor o Encargado Legal rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())


}

export const isRootAdministratorOrTeacherOrLegalManagerOrStudent = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario Encargado legal o administrador o profesor");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Encargado Legal" || roles[i].name === "Estudiante" || roles[i].name === "Administrador" || roles[i].name === "Profesor" || roles[i].name === "Root") {
            next()
            return;
        }
    }
    setMessage("Requiere Administrador o Profesor o Encargado Legal rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())


}





export const isRoot = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario root");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }
    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }
    const roles = await Role.find({ _id: { $in: user.roles } })
    //console.log(roles);// Me permite ver el ID y el rol del usuario por consola
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Root") {
            next()
            return;
        }
    }
    setMessage("Requiere Root rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())
}


export const isTeacherOrRoot = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario profesor o root");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }

    const roles = await Role.find({ _id: { $in: user.roles } })
    //console.log(roles);// Me permite ver el ID y el rol del usuario por consola
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Root" || roles[i].name === "Profesor") {
            next()
            return;
        }
    }
    setMessage("Requiere Administrator o Root rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())


}



export const isLegalManager = async (req, res, next) => {
    //Como obtener el ID del usuario
    const idUser = req.userId; // Recibir el id del usuario.
    if (!idUser) {// No se ingreso el id del usuario
        setMessage("No ha ingresado el Id del usuario root");
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }
    const user = await User.findById(idUser)
    if (!user) {// Cuando se recibe un Id que no existe en la base de datos.
        setMessage("El Id ingresado no existe en la base de datos, " + idUser);
        setError(true);
        setData([]);
        return res.status(400).json(getJSON());
    }
    const roles = await Role.find({ _id: { $in: user.roles } })
    //console.log(roles);// Me permite ver el ID y el rol del usuario por consola
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Encargado Legal") {
            next()
            return;
        }
    }
    setMessage("Requiere Encargado legal rol"); setError(true); setData([]);
    return res.status(403).json(getJSON())
}

