import crypto from 'crypto';
import { User } from "../models/userModel.js";
import { responseHandler } from "./responseHandler.js";

function passwordDigest(password, salt){
  return crypto.createHash("sha256", salt).update(password).digest("hex");
}
function compareDigest(enteredPassword, storedDigest){
  return enteredPassword == storedDigest;
}

export async function userSignUp(request, response) {
  const {username, email, password} = request.body;
  try {
    const user = await User.findOne( {email: email} );
    if( user ){
      return response.status(400).json(
        responseHandler(false, "400", "Email in use", 
        "Provided Email is Already in use!")
      );
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const newUser = {
      username: username,
      email: email,
      password: passwordDigest(password, salt),
      salt: salt
    }
    const insertRes = await User.create(newUser)
    if ( !insertRes ) {
      throw new Error("User Creation Failed.");
    }
    request.session.userId = newUser.username;
    request.session.isLoggedIn = true;
    console.log("Session after login:", request.session);
    return response.status(201).json(newUser);

  } catch (error) {
    response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function userLogin( request, response) {
  const { email, password } = request.body;
  try {
    const user = await User.findOne( {email: email} );
    if( !user ){
      return response.status(404).json(
        responseHandler(false, "404", "Item Not Found", 
        "The item you requested could not be found.")
      );
    }

    const enteredDigest = passwordDigest(password, user.salt);
    const storedDigest = user.password;
    if( !compareDigest(enteredDigest, storedDigest)){
      return response.status(401).json(
        responseHandler(false, "401", "Unauthorized Acces", 
        "The Entered Password is wrong.")
      );
    }

    request.session.userId = user.username;
    request.session.isLoggedIn = true;

    console.log("Session after login:", request.session);
    return response.status(200).json(user);

  } catch (error) {
    return response.status(500).json(
      responseHandler(false, "500", "Internal Error", error.message)
    );
  }
}

export async function userLogout(request, response) {
  if( request.session && request.session.userId ){
    request.session.destroy((error) => {
      if( error ){ 
        return response.status(500).json(
          responseHandler(false, "500", "Internal Error", error.message)
        );
      }response.clearCookie("connect.sid");
      return response.status(200).json({ message: "Logged out successfully." });
    })
  }
}

export async function getUsers(request, response) {
  try {
    const user = await User.find();
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
}