// The "express-async-errors" package is an Express.js middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing. It simplifies error handling in Express.js applications by allowing you to write asynchronous code without worrying about manually catching and forwarding errors.
import "express-async-errors";

// import mongoose
import mongoose from "mongoose";

//for variables in .env file
import * as dotenv from "dotenv";
dotenv.config();

// cookie parser
import cookieParser from "cookie-parser";

import express from "express";
const app = express();

//morgan is a package that logs the requests made to the server
import morgan from "morgan";

// import validation
import { validateTest } from "./middleware/validationMiddleware.js";

// Status Codes for CRUD & route responses
import { StatusCodes } from "http-status-codes";

//import cloudinary
import cloudinary from "cloudinary";

//import routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware for error handling
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

//middleware for authentication
import { authenticateUser } from "./middleware/authMiddleware.js";

// cloudinary file cloud storage setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// installing security middleware packages helmet & mongoSanitize
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// setup public dir
const __dirname = dirname(fileURLToPath(import.meta.url));

// setup env variables on morgan middleware
if (process.env.NODE_ENV === "development") {
  //setup middleware to use the morgan package with the 'use' method
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));

// middleware
app.use(express.json());
// implement the cookieparser as middleware in order to read the cookies that hold the JWT
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({
//     message: `hello ${name}`,
//   });
// });

// another test route
app.get("/api/v1/test", (req, res) => {
  res.json({
    msg: "test route",
  });
});

// implementing security middleware packages helmet & mongoSanitize
app.use(helmet());
app.use(mongoSanitize());

//middleware for routers
//jobRouter, add authenticateUser for all job routes, to protect all job routes
app.use("/api/v1/jobs", authenticateUser, jobRouter);
//userRouter
app.use("/api/v1/users", authenticateUser, userRouter);
//authRouter
app.use("/api/v1/auth", authRouter);

// route for public production for server.js to point to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//more middleware
// not found -- requests/routes for resources that don't exist
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "not found" });
});

// for unexpected errors, usually for general valid requests
// using custom error handling middleware
app.use(errorHandlerMiddleware);

// Port
const port = process.env.PORT || 5100;

//DB connection
try {
  await mongoose.connect(process.env.MONGO_URL);
  // server is listening to port
  app.listen(port, () => {
    console.log("server is listening on port: " + port);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
