import { Router } from "express";
const router = Router();
import * as contactCtrl from "../controllers/contacts.controller";
import { authJwt } from "../middlewares";

router.post('/', contactCtrl.createContact)
router.get('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], contactCtrl.getContact)//Solamente el rol de administrador o root se puede traer todos los contactos.
router.get('/:contactId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], contactCtrl.getContactById)//Los roles asignados en el metodo pueden traer contactos por ID
router.put('/:contactId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], contactCtrl.updateContactById)
router.delete('/:contactId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], contactCtrl.deleteContactById)


export default router;
