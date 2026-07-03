import  { Router } from "express";
import { crearVenta } from "../controllers/ventas.controller.js";

const router = Router();

// La ruta que maneja el POST
router.post('/ventas', crearVenta);

export default router;