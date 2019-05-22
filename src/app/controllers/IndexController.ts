import { Request, Response } from "express";
import event from "app/events";

class IndexController {
  static async index(req: Request, res: Response) {
    event.emit("new:user", "Joe");
    return res.status(402).json({
      success: true,
      message: "Welcome to the best api starter"
    });
  }

  static async notFound(req: Request, res: Response) {
    return res.status(402).json({
      success: false,
      message: "Requested resource not found."
    });
  }
}

export default IndexController;
