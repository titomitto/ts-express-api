import { Router } from "express";
import event from "app/events";
import { IndexController, AuthController } from "./controllers";

const router: any = Router();


router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.group('/password', (router: Router) => {
    router.post("/forgot", AuthController.forgotPassword);
    router.post("/reset", AuthController.resetPassword);
});

// Default handlers

router.use("**", IndexController.notFound);
export default router;
