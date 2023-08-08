// Ver si me envia un correo nuevo o si el usuario existe o si el rol que envia ya fue creado es una validación.

// Si me esta enviando un correo nuevo o si el usuario existe o el rol es nuevo o ya existe.
// Esto es para validarlo
import { ROLES } from "../models/Role"
import User from "../models/User"

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //const user = await User.findOne({ username: req.body.username })
    //console.log(user)
    // if (user) return res.status(400).json({ message: 'The user already exists' })

    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: 'The email already exists' })

    next();

}



export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }
    next();
}