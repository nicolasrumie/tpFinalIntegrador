import { Router } from "express";

import { validateProduct } from "../middlewares/middlewares.js";
import { getAllProducts, getActiveProducts, getProductById, createProduct, updateProduct, unactiveProduct, activeProduct } from "../controllers/product.controllers.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/active", getActiveProducts);

router.get("/:id", getProductById);

router.post("/", validateProduct, createProduct);

router.put("/:id", validateProduct, updateProduct);

router.put("/products/:id", unactiveProduct);

router.put("/active/:id", activeProduct);


export default router;