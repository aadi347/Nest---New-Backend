import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const adminDashboard = (req, res) => {
  res.json({ message: "Admin Dashboard", admin: req.user });
};
