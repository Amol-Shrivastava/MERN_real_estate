// import { errorHandler } from "../middleware/errorHandler.middleware.js";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { errorGenerationFunc } from "../utils/errorGen.js";
import listingModel from "../models/listing.model.js";

const testAPI = (req, res) => {
  res.json({
    message: "Hello World",
  });
};

const updateUserInfo = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(
        errorGenerationFunc(
          401,
          "You are not authorized update others account."
        )
      );

    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, 10);

    const { username, email, password, avatar } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true }
    );
    {
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: tokenId } = req.user;
    if (tokenId !== id)
      return next(
        errorGenerationFunc(401, "You can only delete your own account")
      );

    await userModel.findByIdAndDelete(id);
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "User has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorGenerationFunc(401, "You can only view your own listings")
      );
    } else {
      const listings = await listingModel
        .find({ userRef: req.params.id })
        .sort({ createdAt: -1 });
      res.status(200).json({ success: true, message: listings });
    }
  } catch (error) {
    next(error.message);
  }
};

export { testAPI, updateUserInfo, deleteUser, getUserListings };
