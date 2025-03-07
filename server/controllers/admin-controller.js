const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Project = require("../models/project-model");

const getAllUsers = async (req, res) => {
  // console.log("admin...");
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "Users Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
const getUserByID = async (req, res) => {
  console.log("request received from getting user by id");

  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updateUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedUserData = await User.updateOne(
      { _id: id },
      {
        $set: updateUserData,
      }
    );
    return res.status(200).json(updatedUserData);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
const deleteProjectByID = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.deleteOne({ _id: id });
    res.status(200).json({ message: "Project deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
const deleteMessageByID = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Messages deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: "Contacts Not Found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getAllProjects = async (req, res) => {
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

const addProject = async (req, res) => {
  try {
    const {
      title,
      category,
      liveLink,
      responsive,
      id,
      imageURL,
      description,
      betterUI,
      sourceCode,
    } = req.body;

    const projectCreated = await Project.create({
      title,
      category,
      liveLink,
      id,
      responsive,
      imageURL,
      description,
      betterUI,
      sourceCode,
    });
    res.status(200).json({
      msg: "Project Added Succesfully",
      projectCreated,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  updateUserByID,
  getAllContacts,
  deleteUserByID,
  deleteMessageByID,
  getAllProjects,
  addProject,
  deleteProjectByID,
};
