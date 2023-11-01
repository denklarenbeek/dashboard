const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/connectDB");

require("dotenv").config({ path: "variables.env" });

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Init Middleware
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Initialize Cookies
app.use(cookieParser());

// Initialize session for storing DATA
// exports.sessionMiddleWare = session({
//     secret: process.env.SECRET,
//     key: process.env.KEY,
//     cookie: { maxAge: 36000000 },
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongoUrl: process.env.DB_URL }),
// });

// app.use(this.sessionMiddleWare);

app.use("/", require("./router/dashboard"));
app.use("/admin", require("./router/admin"));
app.use("/api", require("./router/api"));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
