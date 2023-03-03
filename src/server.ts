import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";

const app = express();
// Middleware; Must come first
app.use(cors()); // allows everyone to access this
app.use(morgan("dev"));
app.use(express.json()); // allows client to send JSON instead of us concating bits from input stream
app.use(express.urlencoded({ extended: true })); // allows client to send e.g. query params

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ messge: "hello" });
});

app.use("/api", protect, router); // protect before router so all routes in router are now protected by this

export default app;
