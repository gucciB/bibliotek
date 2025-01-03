import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";

import { responseHandler } from "./responseHandler.js";

export async function insertBook (request, response) {
  try{
    const { title, author, publishYear } = request.body;
    if( !title || !author || !publishYear ){
      return response.status(400).json(
        responseHandler(false, "400", "Invalid Input", "All Fields Should be Entered")
      );
    }
    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return response.status(200).json(book);
  }catch(error){
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function getBooks(request, response) {
  try{
    const books = await Book.find();
    return response.status(200).json({
      count: books.length,
      data: books
    })
  }catch( error ){
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function searchBooks(request, response) {
  const { name, author, publishYear } = request.query;
  const title = name ? name.replace(/[_+]/g, " ") : null;
  
  const query = {};
  if(title) query.title = {$regex: title, $options: "i"};
  if(author) query.author = {$regex: author, $options: "i"};
  if(publishYear) query.publishYear = parseInt(publishYear, 10);
  
  try{
    const book = await Book.find( query );
    if( !book || book.length === 0 ){
      return response.status(404).json(
        responseHandler(false, "404", "Item Not Found", 
        "The item you requested could not be found.")
      );
    }return response.status(200).json(book);
  }catch(error){
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function getBookbyID(request, response) {
  try{
    const { id } = request.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
      return response.status(400).json(
        responseHandler(false, "400", "Invalid Input", "Invalid Document ID")
      );
    }
    const book = await Book.findById(id);
    if( !book ){
      return response.status(404).json(
        responseHandler(false, "404", "Item Not Found", 
        "The item you requested could not be found.")
      );
    }return response.status(200).json(book);
  }catch(error){
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function updateBook(request, response) {
  try {
    const { title, author, publishYear } = request.body;
    if( !title || !author || !publishYear ){
      return response.status(400).json(
        responseHandler(false, "400", "Invalid Input", "All Fields Should be Entered")
      );
    }
    const { id } = request.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
      return response.status(400).json(
        responseHandler(false, "400", "Invalid Input", "Invalid Document ID")
      );
    }

    const result = await Book.findByIdAndUpdate(id, { title, author, publishYear });
    if( !result ){
      return response.status(404).json(
        responseHandler(false, "404", "Item Not Found", 
        "The item you requested could not be found.")
      );
    }return response.status(200).json(
      responseHandler(true, "200", "OK", "Item Updated Succesfully.")
    );
  } catch (error) {
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function deleteBook(request, response) {
  try {
    const { id } = request.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
      return response.status(400).json(
        responseHandler(false, "400", "Invalid Input", "Invalid Document ID")
      );
    }

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json(
        responseHandler(false, "404", "Item Not Found", 
        "The item you requested could not be found.")
      );
    }
    return response.status(200).json(
      responseHandler(true, "200", "OK", "Item Deleted Succesfully.")
    );
  } catch (error) {
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}