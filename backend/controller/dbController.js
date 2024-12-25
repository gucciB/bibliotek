import mongoose from "mongoose";

export async function createConnection( URI ) {
  try{
    await mongoose.connect( URI );
    console.log('Conneced to Database');
  }catch(error){
    console.log("Database Coonnection failed.", error);
    process.exit(0);
  }
}

export async function closeConnection() {
  try {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
}