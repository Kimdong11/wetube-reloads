import express from "express";



const vidoeRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch Video");

vidoeRouter.get("/watch", handleWatchVideo);

export default vidoeRouter;