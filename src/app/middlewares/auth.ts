import { Request, Response, NextFunction } from "express";
import { User } from "app/models";
import jwt from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  let { authorization } = req.headers;
  if (authorization && authorization.includes("Bearer")) {
    authorization = authorization.split(" ")[1].trim();
    jwt.verify(authorization, process.env.APP_KEY, async (err, decodedToken) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: "Invalid token!"
        });
      const user = await User.findOne({
        where: {
          id: decodedToken.uuid
        }
      });
      if (user) {
        res.locals.auth = {
          user: user
        };
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "User unauthorized!"
        });
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!"
    });
  }
};
