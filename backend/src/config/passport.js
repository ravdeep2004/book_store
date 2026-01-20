const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5001/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Google Strategy: Profile received for", profile.emails[0].value);

            try {
                const email = profile.emails[0].value;

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email,
                        googleId: profile.id,
                    });
                //link google acc to existing email
                } else if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

module.exports = passport;
