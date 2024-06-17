const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true 
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: [true, "Username is required."]
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favorites: {
      type: [Schema.Types.ObjectId
      ],
      ref: "Cocktail"
    }
  },
  { 
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
