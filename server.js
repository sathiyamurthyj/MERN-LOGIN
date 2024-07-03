const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();
// initialize express
const app = express();
// middleware to parse json
app.use(express.json());
// enabling cors for all origin
app.use(cors());

connectDB();

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server is running in port ", PORT));