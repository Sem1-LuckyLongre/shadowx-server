// const z = require("zod");

// // creating Schema for Registartion
// const signUpSchema = z.object({
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
//   phone: z
//     .string({ required_error: "Phone No. is required." })
//     .trim()
//     .length(10, { message: "Phone No. must be exectly 10 digits" }),
//   password: z
//     .string({ required_error: "Pasword is required" })
//     .min(7, { message: "Password must be at least of 7 characters" })
//     .max(1024, "Password can't be greater than 1024 characters")
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{7,}$/, {
//       message:
//         "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)",
//     }),
// });

// const signInSchema = z.object({
//   email: z
//     .string({ required_error: "Email is required." })
//     .trim()
//     .email({ message: "Invalid Email Address" })
//     .min(5, { message: "Email msut be at least of 3 characters" })
//     .max(70, { message: "Email must not be more than 70 characters" }),
//   password: z
//     .string({ required_error: "Pasword is required" })
//     .min(7, { message: "Password must be at least of 7 characters" })
//     .max(1024, "Password can't be greater than 1024 characters")
//     .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{7,}$/, {
//       message:
//         "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)",
//     }),
// });

// module.exports = { signUpSchema, signInSchema };
