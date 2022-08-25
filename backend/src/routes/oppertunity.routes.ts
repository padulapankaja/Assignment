const express = require("express");
const router = express.Router();
import OppertunityController from "../controllers/oppertunity.controller";

router.post(
  "/",
  OppertunityController.Validate("create"),
  OppertunityController.create_oppertunity
);

router.get(
  "/customer/:id",
  OppertunityController.get_all_oppertunites_reated_to_customer
);

router.get("/:id", OppertunityController.get_single_oppertunity);

module.exports = router;
