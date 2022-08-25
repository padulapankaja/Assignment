const express = require("express");
const router = express.Router();
import CustomerController from "../controllers/customer.controller";

router.post(
  "/create",
  CustomerController.Validate("create"),
  CustomerController.create_customer
);

router.get("/all", CustomerController.get_all_customers);

router.get("/:id", CustomerController.get_single_customer);

module.exports = router;
