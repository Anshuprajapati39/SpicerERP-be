import User from "../User.js";
import bcrypt from "bcryptjs";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};