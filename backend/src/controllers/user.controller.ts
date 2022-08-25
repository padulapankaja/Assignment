import { check, validationResult } from "express-validator";
import { User } from "../models/user.model";
require("dotenv").config();

class Users {
  async user_sign_in(req: any, res: any) {
    try {
      const errors = validationResult(req);

      // validate request
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Failed",
          errors: errors.array(),
        });
      }
      const { email, password } = req.body;

      const user_available = await User.findOne({
        email: email,
        password: password,
      });

      if (!user_available) {
        return res.status(400).json({
          success: false,
          message: "User not found",
          data: {},
        });
      }
      return res.status(200).json({
        success: true,
        message: "Success",
        data: user_available,
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
