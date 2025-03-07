const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: [String], // Array of strings
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    required: true,
  },
  responsive: {
    type: String,
    enum: ["YES", "NO"], // Only allows "YES" or "NO"
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  betterUI: {
    type: String,
    required: true,
  },
  sourceCode: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Myproject", projectSchema);

module.exports = Project;
