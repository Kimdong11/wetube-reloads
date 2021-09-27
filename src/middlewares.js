export const localMiddlewatr = (req, res, next) => {
    res.locals.loggedIn =Boolean(req.session.loggedIn);
    res.locals.sitename = "Wetube"
    res.locals.loggedInUser = req.session.user;
    next();
};