import express from "express";
import morgar from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import vidoeRouter from "./routers/videoRouter"

const PORT = 4000;

const app = express();
const logger = morgar("dev");
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", vidoeRouter);
app.use("/users", userRouter)

const handleListening = () => 
console.log(`Server listening on http://localhost:${PORT}`);

app.listen(4000, handleListening);
