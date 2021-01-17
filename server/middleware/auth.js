module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // where does isAuthenticated come from? something from passport? or is it built in
      return next();
    } else {
      res.redirect("/");
    }
  },
};
