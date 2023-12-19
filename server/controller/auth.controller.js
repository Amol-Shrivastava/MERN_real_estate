//import model
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errFunc } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errFunc(404, "User not found!"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errFunc(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
