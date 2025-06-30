const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Namaste Node");
})

app.use("/home", (req, res) => {
    res.send("Home Page");
})

app.use("/about", (req, res) => {
    res.send("About Page");
})

app.listen(7000, () => {
    console.log("Server is running on Port 7000");
})