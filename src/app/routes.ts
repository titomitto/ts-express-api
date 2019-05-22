import { Router } from "express";
import event from "app/events";
import { IndexController, AuthController } from "./controllers";

const router: any = Router();

router.use("/", IndexController.index);
router.use("**", IndexController.notFound);
router.post("/login", AuthController.login);
router.post("/recover-password", AuthController.recoverPassword);

export default router;
