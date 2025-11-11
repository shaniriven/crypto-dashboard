import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model";

export class AuthService {
  static async signup(name: string, email: string, password: string) {
    const exists = await User.findOne({ name: name });
    if (exists) throw new Error("User already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    return { user, token };
  }
}
