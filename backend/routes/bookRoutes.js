import {Router} from "express";
const bookRoute = Router();

import { 
  getBooks, 
  insertBook,
  searchBooks, 
  getBookbyID,
  updateBook,
  deleteBook
} from "../controller/bookController.js";

bookRoute.post("/", insertBook);
bookRoute.get("/", getBooks);
bookRoute.get("/search", searchBooks);

bookRoute.get("/:id", getBookbyID);
bookRoute.put("/:id", updateBook);
bookRoute.delete("/:id", deleteBook);




export default bookRoute;