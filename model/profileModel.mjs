import mongoose from 'mongoose';
const { Schema } = mongoose;
const profileSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});
const profileModel = mongoose.model('student', profileSchema)
export default profileModel;