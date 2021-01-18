const passport = require("passport");
const User = require("../models/User");

module.exports = {
  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  googleAuthCallback: passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },
  getUser: function (req, res) {
    res.send(req.user);
  },
  deleteUser: async function (req, res) {
    await User.deleteOne({ _id: req.user._id });
    res.redirect("/");
  },
};
