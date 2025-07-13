const express = require("express");
const connectDB = require("./config/db");
const app = express();

const User = require("./models/user")
app.use(express.json());

// const { userAuth } = require("./middlewares/userAuth");

// app.use("/", (req, res) => {
//     res.send("Namaste Node");
// })

// app.use("/user", userAuth);

// app.use("user/home", (req, res) => {
//     res.send("Home Page");
// })

// app.use("user/about", (req, res) => {
//     res.send("About Page");
// })

// app.use("/", (err, req, res, next) => {
//     if(err){
//         res.status(500).send("Something went wrong"); 
//     }
// })

app.post("/signup", async (req,res) => {
    // const userObj = {
    //     firstName: "Zaid",
    //     lastName: "Khan",
    //     emailId: "test@example.com",
    //     password: "password123"
    // }

    const user = new User(req.body);
    await user.save();
    res.send("User Added Successfully")
});

app.get("/users", async (req,res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({emailId: userEmail});
        res.send(user);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        })

        res.send(user);
    } catch (error) {
        res.status(500).send("Something went wrong");
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
