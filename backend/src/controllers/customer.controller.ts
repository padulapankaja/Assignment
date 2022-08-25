import { check, validationResult } from "express-validator";
import mongoose from "mongoose";
import { ICustomer } from "../interfaces/customer.interface";
import { Customer } from "../models/customer.model";
const customerStatus = ['Active','Non-Active', 'Lead']
class Customers {
  async create_customer(req: any, res: any) {
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
      const { email, name, status, other } = req.body;
      if(!customerStatus.includes(status)){
        return res.status(400).json({
          success: false,
          message: "Status must be Active, Non-Active or Lead",
        });
      }
      const existing_customer = await Customer.findOne({email: email});
      console.log(existing_customer);
      
      if(existing_customer){
        return res.status(400).json({
          success: false,
          message: "Customer already registered in the system",
        });
      }
      const customer_attr: ICustomer = {
        email,
        name,
        status,
        other,
      };
      const new_customer = await Customer.create(customer_attr);

      return res.status(200).json({
        success: true,
        message: "Successfully create a customer",
        data: new_customer,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Faild",
        data: error,
      });
    }
  }

  async get_all_customers(req: any, res: any) {
    try {
      const all_customers = await Customer.find();
      return res.status(200).json({
        success: true,
        message: "Success",
        data: all_customers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Faild",
        data: error,
      });
    }
  }
  async get_single_customer(req: any, res: any) {
    try {
      const { id } = req.params;

      const id2 = new mongoose.Types.ObjectId(id);
      const single_customer = await Customer.findOne({ _id: id2 });

      if (!single_customer) {
        return res.status(400).json({
          success: false,
          message: "Customer not found",
          data: {},
        });
      }
      return res.status(200).json({
        success: true,
        message: "Success",
        data: single_customer,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Unable to find the customer",
        data: {},
      });
    }
  }

  Validate(method: string) {
    switch (method) {
      case "create": {
        return [
          check("name", "Name is required!").exists(),
          check("email", "Email is required!").exists().isEmail(),
          check("status", "Status is required!").exists(),
        ];
      }
    }
  }
}

export default new Customers();
