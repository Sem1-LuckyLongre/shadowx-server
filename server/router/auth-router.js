const experss = require("express");
const authControllers = require("../controllers/auth-controller");
const router = experss.Router();

const authMiddleware = require("../middelwares/auth-middleware");
// const { signUpSchema, signInSchema } = require("../validators/auth-validator");
// const validate = require("../middelwares/validate-middleware");

router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);
router
  .route("/user/profile/edit")
  .patch(authMiddleware, authControllers.updateUserProfileById);
router
  .route("/user/profile/change-password")
  .post(authMiddleware, authControllers.changePassword);

module.exports = router;
