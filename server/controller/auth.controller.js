//import model
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorGenerationFunc } from "../utils/errorGen.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true, message: "User is created.." });
  } catch (error) {
    next(errorGenerationFunc(550, "Error from signUp function"));
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorGenerationFunc(404, "User not found!"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword)
      return next(errorGenerationFunc(401, "Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: rest });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn };
