import { setData, setError, setMessage, getJSON } from '../models/crearJSON'
import Role from "../models/Role";


export const getEstado = async (req, res) => {
    const role = await Role.find();

    setData(role); setError(false); setMessage("Exito");
    setMessage("Exito"); setData(role); setError(false);

    return res.status(200).json(getJSON());

    //  return res.status(200).json(role)

}