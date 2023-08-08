//endponit relacionados con los productos CRUD

import { Router } from "express";
const router = Router();
import * as accountCtrl from "../controllers/account.controller";


router.put('/:id', accountCtrl.getUsuarioEmailPasswordID)


export default router;
