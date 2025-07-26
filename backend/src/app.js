const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("DataBase connection successful.")
    app.listen(7000, () => {
        console.log("Server is running on Port 7000");
    })
}).catch(err => {
    console.log("DB Connection failed")
})
