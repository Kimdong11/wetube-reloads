import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", {pageTitle : "Join"});
export const postJoin = async (req, res) => {
    const {email, username, password,password2, name, location} = req.body;
    const exist = await User.exists({ $or: [{username}, {email}]});
    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage:"Password confirmation does not match"
        });
    };
    if(exist) {
        return res.status(400).render("join", {pageTitle : "Join", errorMessage:"Username/Email is already taken!"})
    };
    await User.create({
        email, 
        username,
        password, 
        name, 
        location
    });
    return res.redirect("/login");
};
export const getLogin = (req, res) => res.render("login", {pageTitle:"Login"}); 
export const postLogin = async (req, res) =>  {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("login", {pageTitle: "Login", errorMessage: "Username does not exist"});   
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return res.status(400).render("login", {pageTitle: "Login", errorMessage: "Password does not match"});      
    }
     return res.redirect("/");
};
 
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");