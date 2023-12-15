//import model
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User is created.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw error;
  }
};

export { signUp };
