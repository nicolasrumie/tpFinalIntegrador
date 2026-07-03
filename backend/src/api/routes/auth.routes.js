import { Router } from 'express';
import { adminLogout, loginAdminRender, createAdmin, loginAdmin } from '../controllers/auth.controllers.js';
import { requireAdmin } from '../middlewares/middlewares.js';
import { adminGetView, adminGetByIdView, adminPostView, adminPutView, adminDeleteView } from '../controllers/admin.view.controllers.js';

const router = Router();

router.get("/login", loginAdminRender);


router.post("/logout", adminLogout);
router.post("/create", createAdmin);
router.post("/login", loginAdmin);

router.get("/admin/get", requireAdmin, adminGetView);
router.get("/admin/getById", requireAdmin, adminGetByIdView);
router.get("/admin/post", requireAdmin, adminPostView);
router.get("/admin/put", requireAdmin, adminPutView);
router.get("/admin/delete", requireAdmin, adminDeleteView);
    

export default router;