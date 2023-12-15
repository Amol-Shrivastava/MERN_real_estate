//import model
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errFunc } from "../utils/error.js";

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User is created.." });
  } catch (error) {
    next(errFunc(550, "Error from signUp function"));
  }
};

export { signUp };
