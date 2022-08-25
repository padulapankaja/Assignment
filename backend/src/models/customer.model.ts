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
  status: {
    type: String,
    enum : ['Active','Non-Active', 'Lead'],
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
