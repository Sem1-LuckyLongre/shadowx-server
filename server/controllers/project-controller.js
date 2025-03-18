const Project = require("../models/project-model");

const projects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ msg: "Projects Not Found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
  }
};

module.exports = projects;
