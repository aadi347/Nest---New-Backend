import Owner from "../models/Owner.js";
import jwt from "jsonwebtoken";

export const ownerSignup = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.status(201).json({ message: "Owner registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Signup failed" });
  }
};

export const ownerLogin = async (req, res) => {
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });

  if (!owner || !(await bcrypt.compare(password, owner.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: owner._id, role: "owner" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

export const ownerDashboard = (req, res) => {
  res.json({ message: "Owner Dashboard", owner: req.user });
};
