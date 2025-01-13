import timespan from "jsonwebtoken/lib/timespan";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: TextTrackCue,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            default: []
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            default: []
        }
    ],

    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    link:{
        type: String,
        default: "",
    }
}, {timestamps: true});

const user = mongoose.model("User", userSchema);