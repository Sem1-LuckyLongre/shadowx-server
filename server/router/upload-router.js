const express = require("express");
const multer = require("multer");
const User = require("../models/user-model");
// const User = require("../models/user-model"); // User Model ko Import Karo
const router = express.Router();

// Multer Storage Setup (Images Folder me Store Hogi)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API: Profile Image Upload
router.post("/profile", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = `https://shadowx-backend.onrender.com/uploads/${req.file.filename}`;

    // Update user profile in MongoDB
    await User.findByIdAndUpdate(req.body.userId, { ProfileImage: imageUrl });

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// API: Get User Profile Image
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.ProfileImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ imageUrl: user.ProfileImage });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

module.exports = router;
