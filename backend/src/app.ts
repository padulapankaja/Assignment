import * as express from "express";
import cors from "cors";
import morgan from "morgan";

import { db_connect } from "./config/db.config";

const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

class App {
  public express;

  constructor() {
    this.express = express.default();
    this.express.use(cors(options));
    this.express.use(morgan("common"));
    this.express.use(cors());
    this.express.use(express.json());
    db_connect();
    this.mountRoutes();
  }

  public mountRoutes(): void {
    this.express.use("/api/users", require("./routes/users.route"));
    this.express.use("/api/customers", require("./routes/customer.routes"));
  }
}

export default new App().express;
