const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page using Controllers");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { name, email, course, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    const userCreated = await User.create({
      name,
      email,
      course,
      password,
      isAdmin,
    });
    res.status(200).json({
      msg: "Registraction Succesfull",
      token: await userCreated.genarateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("Internel Server Error...");
    // next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    const isPasswordRight = await bcrypt.compare(password, userExists.password);
    if (isPasswordRight) {
      res.status(200).send({
        msg: "Login Succesfull",
        token: await userExists.genarateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password!" });
      next();
    }
  } catch (error) {
    res.status(500).json("Internel Server Error...");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).send({ userData });
  } catch (error) {
    console.log(`Error from user controller ${error}`);
  }
};

const updateUserProfileById = async (req, res) => {
  try {
    console.log("req reacived from edit");

    const id = req.user._id;
    const updateUserData = req.body;
    const updatedUserData = await User.updateOne(
      { _id: id },
      {
        $set: updateUserData,
      }
    );
    res.status(200).json(updatedUserData);
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById({ _id: req.user._id });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res
        .status(200)
        .send({ message: "Previous Password in Incorrect!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        password: hashedPassword,
      }
    );

    res.status(200).send({ message: "Password Changed Successfully!" });
  } catch {
    res.status(500).send({ message: "Failed to change password" });
  }
};

module.exports = {
  home,
  register,
  login,
  user,
  updateUserProfileById,
  changePassword,
};
