const { Schema, model } = require("mongoose");
const cocktailDefault = ""


const CocktailSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true //! buscar que es trim
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: ["Classic Cocktails", "Highballs", "Seasonal Cocktails", "Dessert Cocktails", "Mocktails", "Fizz Cocktails", "Tiki Cocktails", "Bitter Cocktails", "Punches", "Aged Cocktails", "Coffee Cocktails", "Sour Cocktails", "Infused Cocktails", "Modern Classics", "Egg White Cocktails", "Crushed Ice Cocktails",  "Sweet and Sour Cocktails", "Fresh Herb Cocktails", "Spiced Cocktails", "Smoked Cocktails"]
    },
    img: {
        type: String,
        default: "https://ehristoforu-dalle-3-xl-lora-v2.hf.space/file=/tmp/gradio/d98454b53a165d6b481d1c9157cb54b6dc2ad244/f1ffaf48-c46d-4e82-8d5e-fbb3f700881b.png"
        // desde el frontend empezando por ruta public
    },
    description: {
      type: String,
    },
    ingredients:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    steps:{
        type: [String],
        required: [true, 'Steps are needed.']
        
      },
      owner:{
        id: "string"
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