// Core Modules
const path = require("path");
// External Module
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const cors = require("cors");
const urlDB =
  "mongodb+srv://root:iamadminlakshya@lakshyadeveloper.nkcqqvp.mongodb.net/spotify?retryWrites=true&w=majority&appName=LakshyaDeveloper";


// Local Module Routes
const rootDir = require("./utils/pathUtil");
const AuthController = require("./controller/AuthController");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: urlDB,
  collection: "sessions",  // Changed from "session" to "sessions"
  expires: 1000 * 60 * 60 * 24 // 24 hours
});

// Handle store errors
store.on('error', function(error) {
  console.log('Session store error:', error);
});

app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    secret: "airbnb.lakshya",
    resave: false,
    saveUninitialized: false,  // Changed to false
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax'  // Added sameSite attribute
    },
    name: 'connect.sid'  // Explicitly set cookie name
  })
);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// app.get('/' , routeController.getHome)
app.use("/api/sign-up", AuthController.postSignUp);
app.use("/api/login", AuthController.postLogin);
app.use("/api/logout", AuthController.logout);
app.use("/api/auth", AuthController.checkLogin);

// Cleanup old sessions periodically
setInterval(() => {
  store.clear((error) => {
    if (error) {
      console.error('Session cleanup error:', error);
    }
  });
}, 86400000); // Run once every 24 hours

const PORT = 3000;

mongoose
  .connect(urlDB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database.", err);
  });
