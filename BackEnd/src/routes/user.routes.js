import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot, verifySignup.checkRolesExisted], userCtrl.createUser) //Insertar el usuario nuevo
router.get('/:id', userCtrl.getUserById) //Buscar user por ID
router.put('/:id', [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManagerOrStudent], userCtrl.setUpdateUserById) //Permite poder actualizar los datos del usuario


export default router;

