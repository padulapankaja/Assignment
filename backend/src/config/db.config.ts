import mongoose from "mongoose";
require("dotenv").config();

export const db_connect = () =>
  mongoose
    .connect(`${process.env.DATABASE}`, {})
    .then(() => {
      return console.info("Successfully connected to Database");
    })
    .catch((error: any) => {
      console.error("Error connecting to database: ", error);
      return process.exit(1);
    });
