import mongoose from "mongoose";
const Schema = mongoose.Schema;
const oppertunitySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },

  customer_id: {
    type: mongoose.Types.ObjectId,
    ref: "Customers",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Opportunity = mongoose.model("Oppertunities", oppertunitySchema);

export { Opportunity };
