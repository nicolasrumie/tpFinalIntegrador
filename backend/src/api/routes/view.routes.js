import { Router } from "express";
import { cartView, indexView, prodView } from "../controllers/view.controllers.js";



const router = Router();

router.get("/index", indexView);

router.get("/carrito", cartView);

router.get("/productos", prodView);

export default router;