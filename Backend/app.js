import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import connectMongoDBSession from "connect-mongodb-session";
import multer from "multer";
import cors from "cors";
import { dirname } from "path";
import { rootDir } from "./utils/pathUtil.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express
const app = express();

const urlDB =
  "mongodb+srv://root:iamadminlakshya@lakshyadeveloper.nkcqqvp.mongodb.net/spotify?retryWrites=true&w=majority&appName=LakshyaDeveloper";

const MongoDBStore = connectMongoDBSession(session);

// Create the session store
const store = new MongoDBStore({
  uri:
    process.env.urlDB ||
    "mongodb+srv://root:iamadminlakshya@lakshyadeveloper.nkcqqvp.mongodb.net/spotify?retryWrites=true&w=majority&appName=LakshyaDeveloper",
  collection: "session", // Use "sessions" as the collection name
});

// Handle store errors
store.on("error", function (error) {
  console.error("Session store error:", error);
});

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

// Initialize session store
const MongoStore = MongoDBStore(session);

app.use(express.static(path.join(rootDir, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // Your frontend URL
    credentials: true,
  })
);

app.use(
  session({
    secret: "airbnb.lakshya",
    resave: false,
    saveUninitialized: false, // Changed to false
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      // maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax", // Added sameSite attribute
    },
    name: "connect.sid", // Explicitly set cookie name
  })
);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

import authRouter from "./Routes/auth.Routes.js"
import MusicRouter from "./Routes/Music.Route.js"

// app.get('/' , routeController.getHome)
app.use("/api/auth", authRouter);
app.use("/api/music", MusicRouter);


// Cleanup old sessions periodically
setInterval(() => {
  store.clear((error) => {
    if (error) {
      console.error("Session cleanup error:", error);
    }
  });
}, 86400000); // Run once every 24 hours

mongoose
  .connect(urlDB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(
        `Server is running on address http://localhost:${PORT || 3001}`
      );
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database.", err);
  });
