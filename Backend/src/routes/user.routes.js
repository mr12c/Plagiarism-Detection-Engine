
import { Router } from "express";

const router = Router();

import { createUser,  } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";

router.route("/register").post(createUser);
router.route("/login").post(login);

export default router;
