import express from "express";
import {edit, remove, logout, see, startGithubLogin, finishGithubLogin} from "..//controllers/userConteroller";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);

export default userRouter;