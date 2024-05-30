const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true //! buscar que es trim
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
  { //! mirar si me puede servir o lo borramos
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;

//Crear models para Cocktails
//user, en esta página.
//crear models para comentarios