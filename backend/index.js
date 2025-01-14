// import dotenv from "dotenv"; dotenv.config();
import "dotenv/config";

import express, { request, response } from "express";
const app = express();
const PORT = process.env.PORT;

// Enabling CORS
import cors from "cors";
app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
}))

// Session Creation
import cookieParser  from "cookie-parser"
import session from "express-session";
import MongoStore from "connect-mongo";
app.use(cookieParser());
app.use( session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure:false,
    maxAge: 1000 * 60 * 60
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "user_sessions",
    ttl: 1000 * 60 * 60 * 24
  })
}))

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
import { createConnection, closeConnection } from "./controller/dbController.js"
const URI = process.env.MONGO_URI;
// Cretate Connection
await createConnection(URI);
// Close Connection on application close
process.on('SIGINT', closeConnection); 

import bookRoute from "./routes/bookRoutes.js";
import userRouter from "./routes/userRoutes.js";

app.get("/", (request, response) => {
  if (request.session && request.session.userId && request.session.isLoggedIn) {
    return response
          .status(200)
          .json({
            isLoggedIn: request.session.isLoggedIn,
            username: request.session.userId
          });
  }return response.status(200).json({
    isLoggedIn: false
  });
});

app.use("/user", userRouter);
app.use("/book", bookRoute);

app.listen( PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});




