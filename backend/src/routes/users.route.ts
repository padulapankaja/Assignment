const express = require("express");
const router = express.Router();
import UsersController from "../controllers/user.controller";

router.post(
  "/signin",
  UsersController.Validate("siginin"),
  UsersController.user_sign_in
);

module.exports = router;
