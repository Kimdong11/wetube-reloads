import express from "express";
import session from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter"
import { localMiddlewatr } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.DB_URL})
}));
app.use(localMiddlewatr);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter)

export default app;


/*괄호 안에 들어갈 적절한 용어는?

(                  ) 작전을 광범위하게 적용함으로써 새로운 유형의 전투조직이 출현하고 해외 군사기지의 필요성이 없어지는 단계까지 전망하게 되었다.*/