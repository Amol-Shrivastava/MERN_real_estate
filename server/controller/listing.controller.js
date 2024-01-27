import Listing from "../models/listing.model.js";

const createListing = async (req, res, next) => {
  try {
    const newListItem = await Listing.create(req.body);
    return res.status(201).json({ success: true, message: newListItem });
  } catch (error) {
    next(error);
  }
};

export { createListing };
