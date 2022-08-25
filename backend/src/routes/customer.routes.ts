const express = require("express");
const router = express.Router();
import CustomerController from "../controllers/customer.controller";

router.post(
  "/",
  CustomerController.Validate("create"),
  CustomerController.create_customer
);
// router.put(
//   "/",
//   CustomerController.Validate("create"),
//   CustomerController.create_customer
// );

router.get("/", CustomerController.get_all_customers);

router.get("/:id", CustomerController.get_single_customer);

module.exports = router;
