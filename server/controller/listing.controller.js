import Listing from "../models/listing.model.js";
import { errorGenerationFunc } from "../utils/errorGen.js";

const createListing = async (req, res, next) => {
  try {
    debugger;
    let obj = null;
    let { imageUrlsArr, otherDetails } = req.body;
    if (!imageUrlsArr && !otherDetails) {
      let { imageUrls, ...otherDetails } = req.body;
      obj = {
        imageUrls,
        ...otherDetails,
      };
    } else {
      obj = {
        imageUrlsArr,
        ...otherDetails,
      };
    }

    const newListItem = await Listing.create(obj);
    return res.status(201).json({ success: true, message: newListItem });
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  try {
    debugger;
    const id = req.params.id;
    const userId = req.user.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(errorGenerationFunc(404, "Listing not found"));
    }
    if (userId !== listing.userRef) {
      return next(
        errorGenerationFunc(401, "You can only delete your own listings")
      );
    }

    await Listing.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Listing is deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export { createListing, deleteListing };
