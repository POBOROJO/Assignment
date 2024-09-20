import jwt from "jsonwebtoken";
import dot from "dotenv";

dot.config({
  path: "../middleware/.env",
});

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "User is not authenticated",
      success: false,
    });
  }
};
export default isAuthenticated;
