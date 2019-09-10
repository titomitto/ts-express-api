import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import event from "app/events";
import { User, ResetToken } from "app/models";
import uniqueString from "unique-string";
import { sendMail } from "app/helpers";
import {loadTemplate} from "app/helpers";

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Incorrect credentials"
      });
    }

    let userPassword = user.password.replace("$2y$", "$2a$");
    if (!await bcrypt.compare(password, userPassword)) {
      return res.status(400).json({
        success: false,
        field: "password",
        message: "Incorrect credentials"
      });
    }else{
      return res.json({
        success: true,
        user,
        accessToken: jwt.sign({uuid: user.id}, process.env.APP_KEY),
        message: "Login successful"
      });
    }
  }

  static async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({
      where: {
        email
      }
    });

    if (user) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "The email address is already in use by another account."
      });
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      password
    })

    return res.json({
      success: true,
      message: "Account created successfuly. Proceed to login"
    });
  }

  static async validToken(req: Request, res: Response){
    
  }

  static async forgotPassword(req: Request, res: Response){
    const { email } = req.body;
    let user = await User.findOne({
      where: {
        email
      }
    });

    if(!user) return res.status(400).json({
      success: false,
      message: "We did not find any user with that email."
    })
    let token = uniqueString();
    let html = await loadTemplate("password-reset.html", {
      token,
      logo: "https://sendgrid.com/brand/sg-twilio/sg-twilio-lockup.svg",
      resetUrl: `http://localhost/reset-password?token=${token}`
    })

    sendMail({
      to: user.email,
      subject: "Reset Password",
      html
    }).then(async (data)=>{
      await ResetToken.create({
        userId: user.id,
        token: token
      });
      res.json({
        success: true,
        message: `We have sent you an email with a reset link to your email ${email}`
      })
    }).catch((error)=> {
      res.status(400).json({
        success: false,
        message: error
      })
    })

    
  }

  static async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body;
    const resetToken = await ResetToken.findOne({
      where: {
        token
      }
    });

    if(resetToken.used) return res.status(400).json({
      success: false,
      message: "The password reset token is already used"
    })

    const user = await User.findOne({
      where: {
        id: resetToken.userId
      }
    });

    user.password = password;
    user.save();

    resetToken.used = true;
    resetToken.save();


    return res.json({
      success: true,
      message: "Password reset successful"
    });
  }
}

export default AuthController;
