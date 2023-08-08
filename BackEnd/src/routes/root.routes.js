import { Router } from "express";
const router = Router();

import * as rootCtrl from "../controllers/root.controllers";

import { authJwt } from "../middlewares";

router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], rootCtrl.getRootDeleteUserByID);//Elimina todo el usuario por ID
router.put('/rol/:userId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], rootCtrl.getRootDeleteRootUserByID);//Elimina el rol del usuario por ID
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], rootCtrl.rootAddRoleUser) //Actualiza el rol del usuario
router.get('/', [authJwt.verifyToken, authJwt.isRoot], rootCtrl.getAllUser);//traer todos los usuarios.

router.put('/actualizarusuario/:userId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], rootCtrl.UpdateUserById);//Elimina el rol del usuario por ID
router.get('/traerusuarioid/:userId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], rootCtrl.getUserById);//Traer usuario por Id

export default router;
