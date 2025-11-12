import jwt from "jsonwebtoken";
import User from "../model/userModel.mjs";
import cloudinary from "../config/cloudinaryConfig.mjs";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ✅ Get user profile
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ✅ Update user profile (name, password, optional avatar)
export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, password } = req.body;

    if (name) user.name = name;
    if (password) user.password = password; // ⚠️ hashing karna na bhoolna agar password update allowed hai

    // ✅ If new avatar is uploaded
    if (req.file) {
      // Upload image to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "user_avatars" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });

          user.avatar = result.secure_url;
          await user.save();

          res.json({
            message: "Profile updated successfully",
            user: { name: user.name, email: user.email, avatar: user.avatar },
          });
        }
      );
      uploadStream.end(req.file.buffer);
    } else {
      // No new avatar uploaded
      await user.save();
      res.json({
        message: "Profile updated successfully",
        user: { name: user.name, email: user.email, avatar: user.avatar },
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
