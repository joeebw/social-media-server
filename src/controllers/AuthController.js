import UserModel from "../models/UserModel.js";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "../utils/security.js";

class AuthController {
  static async register(req, res) {
    const {
      email,
      password,
      firstName,
      lastName,
      location,
      occupation,
      profilePicture,
    } = req.body;

    const user = await UserModel.findByEmail(email);

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      location,
      occupation,
      profilePicture: profilePicture || "",
    };

    const userId = await UserModel.create(newUser);

    const payload = { userId };
    const token = generateToken(payload);

    res.status(201).json({ token, id: userId });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid Email and Password" });
    }

    const userWithPasswordHash = await UserModel.findByIdWithSensitiveData(
      user.id
    );

    if (!userWithPasswordHash) {
      return res.status(400).json({ message: "Invalid Email and Password" });
    }

    const isMatch = await comparePasswords(
      password,
      userWithPasswordHash.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email and Password" });
    }

    const payload = { userId: Number(user.id) };
    const token = generateToken(payload);

    res.json({ token, id: user.id });
  }

  static async loginGuest(req, res) {
    const payload = { userId: 9 };
    const token = generateToken(payload);

    res.json({ token, id: 9 });
  }
}

export default AuthController;
