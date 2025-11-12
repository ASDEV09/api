import fs from 'node:fs'
import Profile from '../model/profileModel.mjs'

let index = async (req, res) => {
    try {
        const profiles = await Profile.find()
        if (profiles.length > 0) {
            res.status(200).json({ message: "Profile fetch successfully", profiles: profiles })
        }
    } catch (err) {
        res.status(404).json({ message: "Profile Not Found" })
    }
}

// 🟢 New: Create Profile
let add = async (req, res) => {
    try {
        const { avatar, name, age, country } = req.body

        if (!avatar || !name || !age || !country) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const newProfile = new Profile({
            avatar,
            name,
            age,
            country
        })

        const savedProfile = await newProfile.save()
        res.status(201).json({ message: "Profile added successfully", profile: savedProfile })
    } catch (error) {
        res.status(500).json({ message: "Error adding profile", error: error.message })
    }
}

let profileController = {
    index,
    add
}
export default profileController;