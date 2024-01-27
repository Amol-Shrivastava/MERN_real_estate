import jwt from "jsonwebtoken";
import { errorGenerationFunc } from "../utils/errorGen.js";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // console.log(`token: ${token}`);
    if (!token) return next(errorGenerationFunc(401, "Unauthorized Access"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorGenerationFunc(403, "Forbidden Access"));

      req.user = user;
      next();
    });
  } catch (error) {}
};

export { verifyToken };
