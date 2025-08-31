// Core Modules
const path = require("path");
// External Module
const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose"); 
const MongoDBStore = require('connect-mongodb-session')(session); 
const multer = require("multer");
const cors = require("cors");
const urlDB = "mongodb+srv://root:iamadminlakshya@lakshyadeveloper.nkcqqvp.mongodb.net/spotify?retryWrites=true&w=majority&appName=LakshyaDeveloper";

// Local Module Routes
const rootDir = require("./utils/pathUtil");
const AuthController = require("./controller/AuthController");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: urlDB,
  collection: 'session'
})

app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // allows frontend
  credentials: true,               // allows cookies to be sent
}));

app.use(session({
  secret: "airbnb.lakshya",
  resave: false,
  saveUninitialized: true,
  store
}))


app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// app.get('/' , routeController.getHome)
app.use('/api/sign-up', AuthController.postSignUp);
app.use('/api/login', AuthController.postLogin);
app.use('/api/auth', AuthController.checkLogin);

const PORT = 3000;

mongoose.connect(urlDB).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("Error while connecting to the database.",err);
});