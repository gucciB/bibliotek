import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'
    ]
  },
  password:{
    type: String,
    required: true
  },
  salt:{
    type: String,
    required: true
  }
},{
  timestamps: true
});

export const User = mongoose.model("User", userSchema);
