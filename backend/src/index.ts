import express from "express";

import cors from "cors";
import morgan from "morgan";
import { db_connect } from "./config/db.config";
require("dotenv").config();
const app = express();
const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
db_connect();
//routes
app.use("/api/users", require("./routes/users.route"));
// app.use('/api/events', require('./routes/event.routes'));

app.get("/", (req: any, res: any) => {
  res.send("Nike API running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started and running on port ${process.env.PORT || 5000}`);
});
