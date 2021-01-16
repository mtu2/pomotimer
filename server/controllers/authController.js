const passport = require("passport");

module.exports = {
  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  googleAuthCallback: passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
  getUser: (req, res) => {
    res.send(req.user);
  },
};
