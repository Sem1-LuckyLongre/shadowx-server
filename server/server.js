require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const projectRoute = require("./router/project-router");
const adminRoute = require("./router/admin-router");
const uploadRoute = require("./router/upload-router"); // Add Upload Route

const app = express();

const corsOptions = {
  origin: ["https://shadowx-frontend.onrender.com", "http://localhost:5173"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", projectRoute);
app.use("/api/admin", adminRoute);
app.use("/api/upload", uploadRoute); // Add Upload API
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
// const BackURI = "http://localhost:3000";

app.route("/").get((req, res) => {
  res.status(200)
    .send(`<h1 style="text-align: center; font-family: Arial, sans-serif; color: #222; margin-bottom: 10px;">
    Welcome to ShadowX
</h1>
<p style="text-align: center; font-size: 16px; color: #444;">
    For further inquiries, please visit our website:
</p>
<p style="text-align: center; margin-top: 5px;">
    <a href="/" style="text-decoration: none; font-size: 18px; color: #007bff; font-weight: bold; transition: color 0.3s;">
        Click Here
    </a>
</p>
`);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
