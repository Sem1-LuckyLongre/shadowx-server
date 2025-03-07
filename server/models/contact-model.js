const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const Contact = new model("Contact", contactSchema);

module.exports = Contact;
// const handleFormSubmit = async (formData) => {
//   const formUserData = Object.fromEntries(formData.entries());
