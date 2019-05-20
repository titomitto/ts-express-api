import { Router } from 'express';
import event from 'app/events';


const router: any = Router();

router.use("/", (req, res)=>{
    event.emit('new:user', "Tito Mordeccai");
    return res.json({
        success: true,
        message: "Welcome to the best api starter"
    });
});

router.use("**", (req, res) => {
    return res.status(400).json({
        success: false,
        message: "Requested resource not found."
    });
});
export default router;
