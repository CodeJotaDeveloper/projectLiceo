//endponit relacionados con los productos CRUD

import { Router } from "express";
const router = Router();
import * as teacherCtrl from "../controllers/teacher.controller";
import { authJwt } from "../middlewares";


router.post('/', [authJwt.verifyToken, authJwt.isTeacherOrRoot], teacherCtrl.createAttendance)//Ruta para enviar asistencia del estudiante.



export default router;
