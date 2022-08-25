import { check } from "express-validator";
require("dotenv").config();

class Users {
  async user_sign_in(req: any, res: any) {
    try {
      return res.status(200).json({
        success: true,
        message: "API live",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Faild",
        data: error,
      });
    }
  }

  Validate(method: string) {
    switch (method) {
      case "siginin": {
        return [
          check("email", "email is required!").exists().isEmail(),
          check("password", "password is required!").exists(),
        ];
      }
    }
  }
}

export default new Users();
