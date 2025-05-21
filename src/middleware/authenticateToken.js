import chalk from "chalk";
import { verifyToken } from "../utils/security.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  try {
    const decoded = await verifyToken(token);

    req.user = { userId: Number(decoded.userId) };

    next();
  } catch (error) {
    console.error(chalk.redBright("Token verification failed:", error.message));
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateToken;
