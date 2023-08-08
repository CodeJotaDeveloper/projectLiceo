//endponit relacionados con los productos CRUD

//Crear news

import { Router } from "express";
const router = Router();
import * as newCtrl from "../controllers/post.controller"
import uploadFile from '../libs/storagePost';


import { authJwt } from "../middlewares";

// Estos metodos nos permite que se compruebe validaciones para el CRUD de noticias
router.get('/', newCtrl.getPost)
router.post('/', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], uploadFile(), newCtrl.createPost) // Primero se verifica el token y luego ingresan en la ruta
router.get('/:postId', newCtrl.getPostById)
router.put('/:postId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], newCtrl.updatePostById)
router.delete('/:postId', [authJwt.verifyToken, authJwt.isAdministratorOrRoot], newCtrl.deletePostById)


export default router;

