const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middelwares/auth-middleware");
const adminMiddleware = require("../middelwares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/messages")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router
  .route("/projects")
  .get(authMiddleware, adminMiddleware, adminController.getAllProjects);
router
  .route("/projects/add")
  .post(authMiddleware, adminMiddleware, adminController.addProject);

router
  .route("/user/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserByID);
  
router
  .route("/project/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteProjectByID);

router
  .route("/user/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserByID);
router
  .route("/user/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserByID);
router
  .route("/messages/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteMessageByID);

module.exports = router;
