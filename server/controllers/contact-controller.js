const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ msg: "message sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "message not delivered" });
    // next(error);
  }
};

module.exports = contactForm;
