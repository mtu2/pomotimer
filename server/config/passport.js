const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// NOTE: passed to require("./config/passport")(passport) in index.js
module.exports = function (passport) {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            // if user is found, log them in
            done(null, user);
          } else {
            // if user isn't in database, create new user
            const newUser = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value,
            });

            user = await newUser.save();
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
