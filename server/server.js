require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

// Import Routes
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const projectRoute = require("./router/project-router");
const adminRoute = require("./router/admin-router");
const uploadRoute = require("./router/upload-router");
const totalVisitsRoute = require("./router/totalVisits-router");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ["https://shadowx-frontend.onrender.com"],
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware to Set CORS Headers
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://shadowx-frontend.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Body Parser Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", projectRoute);
app.use("/api/admin", adminRoute);
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/data", totalVisitsRoute);

// Home Route
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1 style="text-align: center; font-family: Arial, sans-serif; color: #222; margin-bottom: 10px;">
      Welcome to ShadowX
    </h1>
    <p style="text-align: center; font-size: 16px; color: #444;">
      For further inquiries, please visit our website:
    </p>
    <p style="text-align: center; margin-top: 5px;">
      <a href="https://shadowx-frontend.onrender.com/" style="text-decoration: none; font-size: 18px; color: #007bff; font-weight: bold; transition: color 0.3s;">
        Click Here
      </a>
    </p>
  `);
});

// Start Server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
