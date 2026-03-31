require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const PORT = 5000
const app = express();

const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5173"
];
//middleware
app.use(express.json());
app.use(cors({
    origin: function (origin,callback) {
        if (!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        } else {
            console.log("❌CORS BLOCKED ORIGIN:",origin)
            callback (new Error("Not allowed by for this origin" + origin))
        }
    },
    credentials: true
}))

//dbconnection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" 🟢 MongoDB connected successfully");
    } catch (error) {
        console.error(" 🔴 Error connecting to MongoDB:", error);
    }
}
connectDB();

//routes
app.get("/",(req,res) => {res.send("Welcome to E-COMMERCE API")});
app.use("/api/v1", require("./routes/authroutes"));
app.use("/api/v1", require("./routes/carroutes"));
app.use("/api/v1", require("./routes/cartroutes"));
app.use("/api/v1", require("./routes/orderroutes"));
app.use("/api/v1", require("./routes/userroutes"));

//start server
app.listen(PORT, ()=> {
    console.log(`Server listening at http://localhost:${PORT}`)
})