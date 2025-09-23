const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const PORT= process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/tourist").then(() =>
  console.log("Mongodb connected")
);






app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});