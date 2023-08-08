// Permite llamar a los archivos authJwt y verifySignup importarse, luego se llama solo este archivo.
import * as authJwt from "./authJwt";
import * as verifySignup from './verifySignup'
//import { verifyToken } from './authJwt'

//export { verifyToken };// Se ve redondante pero es para poder exportar el verifyToken
export { authJwt, verifySignup }