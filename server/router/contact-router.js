const experss = require("express");
const router = experss.Router();

const contactForm = require("../controllers/contact-controller");
// const validate = require("../middelwares/validate-middleware");
// const contactFormValidation = require("../validators/contact-validator");

router.route("/contact").post(contactForm);

module.exports = router;
