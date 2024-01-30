import Listing from "../models/listing.model.js";

const createListing = async (req, res, next) => {
  try {
    const { imageUrlsArr, otherDetails } = req.body;
    let obj = {
      imageUrlsArr,
      ...otherDetails,
    };

    const newListItem = await Listing.create(obj);
    return res.status(201).json({ success: true, message: newListItem });
  } catch (error) {
    next(error);
  }
};

export { createListing };
