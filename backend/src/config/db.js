const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://zk76159:Password13@devtinder.nxmsnxz.mongodb.net/?retryWrites=true&w=majority&appName=DevTinder"
    );
};

module.exports = connectDB;