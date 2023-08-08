//endponit relacionados con los productos CRUD

//Crear prematricula
import { Router } from "express";
const router = Router();
import * as resetCtrl from '../controllers/resetpassword.controller'


router.put('/', resetCtrl.existecorreo)


export default router;