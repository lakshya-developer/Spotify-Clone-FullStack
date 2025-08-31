const { check, validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { message } = require("prompt");

exports.getSignUp = (req, res, next) => {
  res.render("auth/sign-up", {
    isLoggedIn: false,
    currentPath: "/sign-up",
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      userType: "",
      term: "",
    },
    userType: "",
  });
}

exports.postSignUp = [
  //First Name
  check("firstName")
    .notEmpty()
    .withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name should be at least of 3 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),
  // Last Name
  check("lastName")
    .notEmpty()
    .withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name should be at least of 3 characters.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),
  // Email
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  // Password
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 charters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least single lower case character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least single upper case character")
    .matches(/[!@#$%^&*()_<>?,.:{}|]/)
    .withMessage("Password must contain at least single special character")
    .trim(),
  // Confirm Password
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),
  // User Type
  check("userType")
    .notEmpty()
    .withMessage("Please select your user type.")
    .isIn(["artist", "listner"])
    .withMessage("Invalid User Type"),
  // Terms and Conditions
  check("terms")
    .notEmpty()
    .withMessage("Please accept the Terms and Conditons")
    .custom((value) => {
      if (value !== true) {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  
  async (req, res, next) => {
    const {firstName, lastName, email, password, userType} = req.body;
    const error = validationResult(req);
    console.log(req.body)

    if(!error.isEmpty()){
      return res.status(400).json({error});
    }

    try{
      bcrypt.hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType
        })
        return user.save()
      }).then((result) => {
        console.log("User Created:", result);
        return res.status(201).json({message: 'User Created'});
      })
    } catch (err) {
      console.log("error occured", err)
    }

}]

exports.postLogin = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});
    if(!user){
      return res.status(401).json({message: "Invalid email or password."});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: "Invalid email or password."});
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
      userType: user.userType
    };

    return res.status(200).json({
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({message: "An error occurred during login"});
  }
}

exports.checkLogin = (req, res, next) => {
  if(req.session.isLoggedIn === true){
    // Send only necessary user data, excluding sensitive information
    const userData = {
      id: req.session.user._id,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      email: req.session.user.email,
      userType: req.session.user.userType
    };
    res.status(200).json(userData);
  } else {
    res.status(401).json({ message: "Not Logged In" });
  }
}
