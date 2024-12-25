import express from "express";
const bookRoute = express.Router();

import { getBooks, 
  insertBook, 
  getBookbyID,
  updateBook,
  deleteBook
} from "../controller/bookController.js";

bookRoute.post("/", insertBook);
bookRoute.get("/", getBooks);
bookRoute.get("/:id", getBookbyID);
bookRoute.put("/:id", updateBook);
bookRoute.delete("/:id", deleteBook);

export default bookRoute;