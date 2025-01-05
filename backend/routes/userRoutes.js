import { Router } from "express";
const userRouter = Router(); 

import { 
  userSignUp, 
  getUsers,
  userLogin,
  userLogout
} from "../controller/userController.js";

userRouter.get("/users", getUsers);
userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);

export default userRouter;