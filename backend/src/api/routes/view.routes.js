import { Router } from "express";
import { cartView, indexView, prodView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";


const router = Router();

router.get("/index", indexView);

router.get("/carrito", requireLogin, cartView);

router.get("/productos", requireLogin, prodView);

export default router;