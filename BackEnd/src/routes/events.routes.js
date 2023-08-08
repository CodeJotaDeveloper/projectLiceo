//endponit relacionados con los eventos CRUD

//Crear Eventos

import { Router } from "express";
const router = Router();
import * as eventCtrl from "../controllers/eventos.controller";

import { authJwt } from "../middlewares";
import uploadFile from '../libs/storageEvento';




router.post('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], uploadFile(), eventCtrl.createEvent)
router.get('/', eventCtrl.getEvent)
router.get('/:eventId', eventCtrl.getEventById)
router.put('/:eventId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], eventCtrl.updateEventtById)
router.delete('/:eventId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], eventCtrl.deleteEventtById)




export default router;
