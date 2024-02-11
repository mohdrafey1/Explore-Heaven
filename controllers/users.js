const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Explore Heaven");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back to Explore Heaven");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged out!");
        res.redirect("/listings");
    });
};

module.exports.showUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you pass the userId in the URL
        const user = await User.findById(userId);
        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/"); // Redirect to homepage or appropriate error page
        }
        res.render("users/profile.ejs", { user }); // Render user profile page
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong");
        res.redirect("/"); // Redirect to homepage or appropriate error page
    }
};