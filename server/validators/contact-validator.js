// const z = require("zod");

// const contactFormValidation = z.object({
//   username: z
//     .string({ required_error: "User Name is required." })
//     .trim()
//     .min(3, { message: "User Name must be at least 3 char long." })
//     .max(50, { message: "User Name must not be more than 50 characters." }),
//   email: z
//     .string({ required_error: "Email is required." })
//     .trim()
//     .email({ message: "Invalid Email Address" })
//     .min(5, { message: "Email msut be at least of 3 characters" })
//     .max(70, { message: "Email must not be more than 70 characters" }),
//   message: z
//     .string({ required_error: "Message is required." })
//     .trim()
//     .min(5, { message: "Message must be at least 5 char long" })
//     .max(3000, { message: "Message must not be graeter than 3000 characters" }),
// });

// module.exports = contactFormValidation;
