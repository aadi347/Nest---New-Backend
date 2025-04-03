import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Owner from "../models/Owner.js";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

// JWT Strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Secret key from .env
};

// Local Strategy for User Login
passport.use(
  "user-login",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Local Strategy for Owner Login
passport.use(
  "owner-login",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const owner = await Owner.findOne({ email });
      if (!owner) return done(null, false, { message: "Owner not found" });

      const isMatch = await bcrypt.compare(password, owner.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, owner);
    } catch (error) {
      return done(error);
    }
  })
);

// Local Strategy for Admin Login
passport.use(
  "admin-login",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return done(null, false, { message: "Admin not found" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, admin);
    } catch (error) {
      return done(error);
    }
  })
);

// JWT Strategy for User
passport.use(
  "user-jwt",
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// JWT Strategy for Owner
passport.use(
  "owner-jwt",
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const owner = await Owner.findById(jwtPayload.id);
      if (!owner) return done(null, false);

      return done(null, owner);
    } catch (error) {
      return done(error, false);
    }
  })
);

// JWT Strategy for Admin
passport.use(
  "admin-jwt",
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const admin = await Admin.findById(jwtPayload.id);
      if (!admin) return done(null, false);

      return done(null, admin);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Serialize and Deserialize Users
passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (obj, done) => {
  try {
    let user;
    if (obj.role === "user") {
      user = await User.findById(obj.id);
    } else if (obj.role === "owner") {
      user = await Owner.findById(obj.id);
    } else if (obj.role === "admin") {
      user = await Admin.findById(obj.id);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
