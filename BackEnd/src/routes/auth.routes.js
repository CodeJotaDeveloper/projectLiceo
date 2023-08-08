import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controller'
import { verifySignup, authJwt } from "../middlewares";

router.post('/signup',
    [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    authCtrl.signUp) //Logearse en la aplicación
router.post('/signin', authCtrl.signIn) //ingresar en la aplicacion




export default router