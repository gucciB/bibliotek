import { Router } from "express";
const userRouter = Router(); 

import { 
  userSignUp, 
  getUsers,
  userLogin 
} from "../controller/userController.js";

userRouter.get("/users", getUsers);
userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);

export default userRouter;