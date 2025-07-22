const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const app = express();
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("DataBase connection successful.")
    app.listen(7000, () => {
        console.log("Server is running on Port 7000");
    })
}).catch(err => {
    console.log("DB Connection failed")
})
