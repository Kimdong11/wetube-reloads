import express from "express";
import {trending} from "../controllers/videoController";
import {join, login} from "../controllers/userConteroller";
 
const globalRouter = express.Router();
 
globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
