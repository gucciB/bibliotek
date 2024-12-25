// import dotenv from "dotenv"; dotenv.config();
import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT;

import cors from "cors";
app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { createConnection, closeConnection } from "./controller/dbController.js"
const URI = process.env.MONGO_URI;
await createConnection(URI);

import bookRoute from "./routes/bookRoutes.js";

app.get("/", (request, response) => {
  response.status(200).send("Home Page");
})

app.use("/book", bookRoute);

app.listen( PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});

//close Connection
process.on('SIGINT', closeConnection);


