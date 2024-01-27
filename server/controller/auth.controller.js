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

const googleAuth = async (req, res, next) => {
  try {
    const { photoURL, displayName, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, message: rest });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      let username =
        displayName.split(" ").join("").toLowerCase() +
        Math.random.toString(36).slice(-6);
      const newUser = new User({
        username: displayName,
        email,
        password: hashedPassword,
        avatar: photoURL,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, message: rest });
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User has been logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, googleAuth, signOut };
