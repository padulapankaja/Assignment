import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  create_date: {
    type: String,
    require: true,
  },
  create_time: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  other: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model("Customers", customerSchema);

export { Customer };
