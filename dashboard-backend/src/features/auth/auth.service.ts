import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model";

export class AuthService {
  static async signup(username: string, email: string, password: string) {
    const existsByEmail = await User.findOne({ email });
    if (existsByEmail) throw new Error("Email already exists");

    const existsByUsername = await User.findOne({ username });
    if (existsByUsername) throw new Error("Username already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    return user;
  }

  static async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid username or password");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid username or password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    return { user, token };
  }
}
