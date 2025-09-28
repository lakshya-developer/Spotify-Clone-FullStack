import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/users.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {upload} from "../middlewares/multer.middleware.js"; // Import multer middleware

export const postSignUp = [

  // Validation rules
  check("firstName")
    .notEmpty()
    .withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name should be at least of 3 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),
  check("lastName")
    .notEmpty()
    .withMessage("Last name should not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name should be at least of 3 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase character")
    .matches(/[!@#$%^&*()_<>?,.:{}|]/)
    .withMessage("Password must contain at least one special character")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("userType")
    .notEmpty()
    .withMessage("Please select your user type.")
    .isIn(["artist", "listner"])
    .withMessage("Invalid User Type"),
  check("terms")
    .notEmpty()
    .withMessage("Please accept the Terms and Conditions")
    .custom((value) => {
      if (value === "true" || value === true) {
        return true;
      }
      throw new Error("You must accept the terms and conditions");
    }),

  async (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const error = validationResult(req);

    console.log(req.body);

    if (!error.isEmpty()) {
      console.log(error);
      return res.status(400).json({ error });
    }

    try {
      const exist = await User.findOne({ email: email });
      if (exist) {
        return res.status(400).json({ message: "User already exists" });
      }

      let userCoverPhotoUrl = ""; // Default to an empty string if no file is uploaded

      if (req.files && req.files?.userCoverPhoto ) {
        const userCoverPhotoPath = req.files?.userCoverPhoto[0]?.path; // Access the uploaded file path
        const cloudinaryResponse = await uploadOnCloudinary(userCoverPhotoPath);
        userCoverPhotoUrl = cloudinaryResponse.url;
      }

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType,
            coverPhoto: userCoverPhotoUrl, // Save the URL as a string
          });
          return user.save();
        })
        .then((result) => {
          console.log("User Created:", result);
          return res.status(201).json({ message: "User Created" });
        });
    } catch (err) {
      console.error("Error occurred during sign-up:", err);
      return res.status(500).json({ message: "An unknown error occurred during sign-up" });
    }
  },
];

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();

    // Return user data after successful login
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
    };

    console.log("user logged in");
    return res.status(200).json({
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

export const checkLogin = (req, res, next) => {
  // First check if session exists
  if (!req.session) {
    return res.status(401).json({ message: "No session found" });
  }

  // Then check if user is logged in
  if (req.session.isLoggedIn && req.session.user) {
    const userData = {
      id: req.session.user._id,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      email: req.session.user.email,
      userType: req.session.user.userType,
      coverPhoto: req.session.user.coverPhoto,
    };

    return res.status(200).json(userData); // Changed to match frontend expectation
  }

  // If not logged in or no user in session
  return res.status(401).json({ message: "Not Logged In" }); // Changed 402 to 401
};

export const logout = (req, res, next) => {
  // Check if session exists
  if (req.session) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'lax'
      });
      
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  } else {
    // If no session exists, just send success response
    return res.status(200).json({ message: 'Already logged out' });
  }
};