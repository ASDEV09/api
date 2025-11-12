import Profile from "../model/profileModel.mjs";
import cloudinary from "../config/cloudinaryConfig.mjs";

// 🟢 Fetch all profiles
let index = async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (profiles.length > 0) {
      res.status(200).json({ message: "Profiles fetched successfully", profiles });
    } else {
      res.status(404).json({ message: "No profiles found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching profiles", error: err.message });
  }
};

// 🟢 Add profile with direct Cloudinary upload
let add = async (req, res) => {
  try {
    const { name, age, country } = req.body;
    const file = req.file;

    if (!file || !name || !age || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🖼 Upload file buffer directly to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profiles" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.end(file.buffer); // send buffer data
    });

    // 🧠 Save profile with Cloudinary URL
    const newProfile = new Profile({
      avatar: uploadResult.secure_url, // 👈 direct cloud URL
      name,
      age,
      country,
    });

    const savedProfile = await newProfile.save();

    res.status(201).json({
      message: "Profile added successfully",
      profile: savedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding profile", error: error.message });
  }
};

export default { index, add };
