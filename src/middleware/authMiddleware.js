import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access Denied. Missing or invalid Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];
  // const token = req.header("Authorization");
  // if (!token) {
  //   return res.status(401).json({
  //     message: "Access Denied",
  //   });
  // }
  try {
    const decoded = jwt.verify(token, process.env.VERCEL_SECRET_KEY);
    console.log("DECODED", decoded);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default verifyToken;
