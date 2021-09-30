import express from "express";
import {getedit, remove, logout, see, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword} from "..//controllers/userConteroller";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middlewares";
import User from "../models/User";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware,logout);
userRouter.route("/edit",).all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start",publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);

export default userRouter;