import { check, validationResult } from "express-validator";
import mongoose from "mongoose";
import { IOppertunity } from "../interfaces/opportunity.interface";
import { Opportunity } from "../models/oppertunity.model";
import { Customer } from "../models/customer.model";
const customerStatus = ["New", "Closed-Won", "Closed-Lost"];
class Opportunities {
  async create_oppertunity(req: any, res: any) {
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
      const { customer_id, name, status } = req.body;
      if (!mongoose.isValidObjectId(customer_id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer id",
        });
      }
      const id2 = new mongoose.Types.ObjectId(customer_id);
      if (!customerStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be New, Closed-Won or Closed-Lost",
        });
      }
      const existing_customer = await Customer.findOne({ _id: id2 });

      if (!existing_customer) {
        return res.status(400).json({
          success: false,
          message: "Customer not found",
        });
      }
      const oppertunity_attr: IOppertunity = {
        name,
        status,
        customer_id,
      };
      const new_oppertunity = await Opportunity.create(oppertunity_attr);

      return res.status(200).json({
        success: true,
        message: "Successfully create a oppertunity",
        data: new_oppertunity,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Faild",
        data: error,
      });
    }
  }

  async get_all_oppertunites_reated_to_customer(req: any, res: any) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer id",
        });
      }
      const id2 = new mongoose.Types.ObjectId(id);
      //   const all_customers = await Opportunity.find({ customer_id: id2 });
      const all_customers = await Customer.aggregate([
        {
          $match: { _id: id2 },
        },
        {
          $lookup: {
            from: "oppertunities",
            localField: "_id",
            foreignField: "customer_id",
            as: "oppertunties",
          },
        },
      ]);
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
  async get_single_oppertunity(req: any, res: any) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid oppertunity id",
        });
      }
      const id2 = new mongoose.Types.ObjectId(id);
      const single_customer = await Opportunity.findOne({ _id: id2 });

      if (!single_customer) {
        return res.status(400).json({
          success: false,
          message: "Opportunity not found",
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
        message: "Unable to find the opportunity",
        data: {},
      });
    }
  }

  Validate(method: string) {
    switch (method) {
      case "create": {
        return [
          check("name", "Name is required!").exists(),
          check("status", "Status is required!").exists(),
          check("customer_id", "Customer id is required!").exists(),
        ];
      }
    }
  }
}

export default new Opportunities();
