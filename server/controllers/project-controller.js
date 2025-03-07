const Project = require("../models/project-model");

const projects = async (req, res) => {
  console.log("Request Receaved");

  try {
    const response = await Project.find();
    if (!response) {
      res.status(404).json({ msg: "No Projects Foud..." });
      return;
    }
    res.status(200).json({ msg: "Projets Fetch Successfully.", response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = projects;
