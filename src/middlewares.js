import multer from "multer";


export const localMiddlewatr = (req, res, next) => {
    res.locals.loggedIn =Boolean(req.session.loggedIn);
    res.locals.sitename = "Wetube"
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
}; 

export const avatarUpload = multer({ dest: "uploads/avatars/", limits : {
    fieldSize: 3000000
}});

export const videoUpload = multer({dest : "uploads/videos", limits : {
    fileSize: 10000000
}});