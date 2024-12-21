import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const password = req.headers["password"];

  if (!password) {
    return res.status(401).json({ error: "Password header is missing" });
  }

  if (password !== process.env.PASSWORD) {
    return res.status(403).json({ error: "Invalid password" });
  }

  next();
};

export default authMiddleware;
