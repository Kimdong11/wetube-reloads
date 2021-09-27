import bcrypt from "bcrypt";
import fetch from "node-fetch";
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
    const user = await User.findOne({username, githubId: false});
    if(!user) {
        return res.status(400).render("login", {pageTitle: "Login", errorMessage: "Username does not exist"});   
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return res.status(400).render("login", {pageTitle: "Login", errorMessage: "Password does not match"});      
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest =await ( await fetch(finalUrl, {
        method:"POST",
        headers: {
            Accept:"application/json",
        },
    })
    ).json();

    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json();
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj) {
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailObj.email});
        if(!user) {
                user = await User.create({
                    avatarUrl:userData.avatar_url,
                    username: userData.login,
                    email: emailObj.email,
                    password:"",
                    location: userData.location,
                    githubId:true,
                    name: userData.login,
            });
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
    }else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy()
    return res.redirect("/");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See");