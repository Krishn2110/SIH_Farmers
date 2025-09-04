import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userDetails from "../models/UserModel.js";
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        let user = await userDetails.findOne({ email });

        if (!user) {
          user = await userDetails.create({
            Name: name,
            email,
            Password: "google-auth",
            role: "user",
            isLogin: true,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
