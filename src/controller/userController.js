import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("Received user data:", user);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ error: error.message || "Signup failed" });
  }
};


export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });


  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("user login", user);

  const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const userDashboard = (req, res) => {
  res.json({ message: "User Dashboard", user: req.user });
};

export const UserLogOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}
