const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: "./Config.env",
});



cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
  });

  module.exports = cloudinary;