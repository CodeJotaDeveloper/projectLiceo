import User from "../models/User"// Importar la base de datos de contacto


export const getUsuarioEmailPasswordID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...other } = user._doc
        setMessage("Exito"); setData(other); setError(false);
        return res.status(200).json(getJSON());
    } catch (error) {
        return res.status(400).json(error)
    }
}

