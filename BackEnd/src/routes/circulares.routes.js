//endponit relacionados con los productos CRUD

//Crear circulares
import { Router } from "express";
const router = Router();
import * as circularesCtrl from '../controllers/circular.controller'
import { authJwt } from "../middlewares";
const upload = require('../libs/storageCircular');


router.post('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], upload.single('image'), circularesCtrl.createCirculares)
router.get('/', circularesCtrl.getCirculares)
router.get('/:circularId', circularesCtrl.getCircularById)
router.put('/:circularId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], circularesCtrl.updateCirculartById)
router.delete('/:circularId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], circularesCtrl.deleteCirculartById)

export default router;