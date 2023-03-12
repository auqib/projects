const express = require("express");
const chats = require("./data/data");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Running!");
});
app.use('/api/user', userRoutes)
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 6000;
app.listen(PORT, console.log(`server started on Port ${PORT}`.yellow.bold))