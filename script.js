const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: [
        "student",
        "college",
        "industry",
      ],
      required: true,
    },

    profile: {
      phone: {
        type: String,
        default: "",
      },

      college: {
        type: String,
        default: "",
      },

      department: {
        type: String,
        default: "",
      },

      year: {
        type: String,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      targetRole: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);
