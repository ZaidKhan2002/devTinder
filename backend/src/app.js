const express = require("express");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const app = express();

const User = require("./models/user")
const { validateSignup } = require("./utils/validation")
const { userAuth } = require("./middlewares/userAuth")

app.use(express.json());


app.post("/signup", async (req,res) => {

    try {
        validateSignup(req)
        const { password } = req.body;
        const passwordHash = bcrypt.hash(password, 10);
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });
        await user.save();
        res.send("User Added Successfully")
    } catch (error) {
        throw new Error("Error" + error.message);
    }
});

app.post("/login", async (req,res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if(!user){
            throw new Error("Email Id not present");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            throw new Error("Password not correct");
        }else{
            res.send("Login Successful");
        }
    } catch (error) {
        res.status(400).send("Error" + error.message)
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR" + error.message);
    }
})


connectDB().then(() => {
    console.log("DataBase connection successful.")
    app.listen(7000, () => {
        console.log("Server is running on Port 7000");
    })
}).catch(err => {
    console.log("DB Connection failed")
})
