import express from "express";
import {getEdit, 
        watch, 
        postEdit, 
        getUpload, 
        postUpload,
        deleteVideo } from "../controllers/videoController";
import { protectorMiddleware,  videoUpload } from "../middlewares";


const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
videoRouter.get("/:id", watch);
videoRouter.route("/:id/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id/delete").all(protectorMiddleware).get(deleteVideo);


export default videoRouter;