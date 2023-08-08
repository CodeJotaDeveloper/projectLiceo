//endponit relacionados con los eventos CRUD

//Crear Eventos

import { Router } from "express";
const router = Router();
import * as estadoCtrl from "../controllers/estado.controller";

router.get('/', estadoCtrl.getEstado)


export default router;
