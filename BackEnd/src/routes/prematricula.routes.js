//endponit relacionados con los productos CRUD

//Crear prematricula
import { Router } from "express";
const router = Router();
import * as prematriculaCtrl from '../controllers/prematricula.controller'
import { authJwt } from "../middlewares";
import uploadFile from '../libs/prematricula/storagePrematricula';


router.post('/', [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManager], uploadFile(), prematriculaCtrl.createPrematricula)
router.get('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], prematriculaCtrl.getPrematricula)
router.get('/:prematriculaId', [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManager], prematriculaCtrl.getPrematriculaById)
router.get('/estudiante/:Cedula',
    [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManager],
    prematriculaCtrl.getPrematriculaByUser)// Traer la prematricula realiza por el usuario.

router.get('/voucherprematriculaestudiante/:Cedula',
    [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManager],
    prematriculaCtrl.getVoucherPrematriculaStudent)// Traer la prematricula realiza por el usuario.


router.get('/studentenrollment/:Cedula_Legal_Manager',
    [authJwt.verifyToken, authJwt.isLegalManager],
    prematriculaCtrl.getAllStudentEnrollment)// Traer la prematricula realiza por el usuario.

router.put('/:prematriculaId', [authJwt.verifyToken, authJwt.isRootAdministratorOrTeacherOrLegalManager], prematriculaCtrl.updatePrematriculaById)
router.put('/estado/:prematriculaId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], prematriculaCtrl.rootAddEstadoPrematricula)
router.delete('/:prematriculaId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], prematriculaCtrl.deletePrematriculaById)

export default router;