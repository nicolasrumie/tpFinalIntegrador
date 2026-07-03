import { Router } from 'express';
import { adminLogout, loginAdminRender, createAdmin, loginAdmin } from '../controllers/auth.controllers.js';
import { requireAdmin } from '../middlewares/middlewares.js';
import { adminGetView, adminGetByIdView, adminPostView, adminPutView, adminDeleteView } from '../controllers/admin.view.controllers.js';

const router = Router();

router.get("/login", loginAdminRender);


router.post("/logout", adminLogout);
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

router.get("/get", requireAdmin, adminGetView);
router.get("/getById", requireAdmin, adminGetByIdView);
router.get("/post", requireAdmin, adminPostView);
router.get("/put", requireAdmin, adminPutView);
router.get("/delete", requireAdmin, adminDeleteView);
    

export default router;