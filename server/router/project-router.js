const express = require("express");
const projects = require("../controllers/project-controller");
const router = express.Router();

router.route("/project").get(projects);

module.exports = router;
