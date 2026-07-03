import { Router } from "express";
import { cartView, indexView, prodView, ticketCartView } from "../controllers/view.controllers.js";
import { validateClient } from "../controllers/client.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";


const router = Router();

router.get("/index", indexView);
router.post("/index", validateClient, indexView);

router.get("/carrito", requireLogin, cartView);

router.get("/productos", requireLogin, prodView);

router.get("/carrito-tickets", requireLogin, ticketCartView);

export default router;