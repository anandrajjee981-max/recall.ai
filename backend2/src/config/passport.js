const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User.model");

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists by providerId
        let user = await User.findOne({ providerId: profile.id, provider: "google" });

        if (!user) {
          // Check if an account with this email already exists (e.g. signed up locally before)
          const email = profile.emails?.[0]?.value;
          user = await User.findOne({ email });

          if (user) {
            // Link Google to the existing account
            user.providerId = profile.id;
            user.provider = "google";
            await user.save();
          } else {
            // Create a brand new user
            user = await User.create({
              name: profile.displayName,
              email,
              provider: "google",
              providerId: profile.id,
              avatar: profile.photos?.[0]?.value || "",
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GITHUB STRATEGY
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id, provider: "github" });

        if (!user) {
          // GitHub emails can be private — fall back to a generated placeholder if missing
          const email = profile.emails?.[0]?.value || `${profile.username}@github.noemail.com`;
          user = await User.findOne({ email });

          if (user) {
            user.providerId = profile.id;
            user.provider = "github";
            await user.save();
          } else {
            user = await User.create({
              name: profile.displayName || profile.username,
              email,
              provider: "github",
              providerId: profile.id,
              avatar: profile.photos?.[0]?.value || "",
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Required by Passport even though we don't use sessions for actual auth state
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;