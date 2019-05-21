import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import event from "app/events";
import { User } from "app/models";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.find({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(402).json({
        success: false,
        field: "email",
        message: "Incorrect credentials"
      });
    }

    let userPassword = user.password.replace("$2y$", "$2a$");
    if (await bcrypt.compare(password, userPassword)) {
      return res.status(402).json({
        success: false,
        field: "password",
        message: "Incorrect credentials"
      });
    }
  }

  static async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;
    const user = await User.find({
      where: {
        email
      }
    });

    return res.status(402).json({
      success: false,
      field: "password",
      message: "Incorrect credentials"
    });
  }
}
