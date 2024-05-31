const { Schema, model } = require("mongoose");


const CocktailSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: ["Classic Cocktails", "Highballs", "Seasonal Cocktails", "Dessert Cocktails", "Mocktails", "Fizz Cocktails", "Tiki Cocktails", "Bitter Cocktails", "Punches", "Aged Cocktails", "Coffee Cocktails", "Sour Cocktails", "Infused Cocktails", "Modern Classics", "Egg White Cocktails", "Crushed Ice Cocktails",  "Sweet and Sour Cocktails", "Fresh Herb Cocktails", "Spiced Cocktails", "Smoked Cocktails"]
    },
    img: {
        type: String,
        default: "https://soberatx.com/wp-content/uploads/2024/01/Drinks-Alternatives-to-Alcohol.webp"
        
    },
    description: {
      type: String,
    },
    ingredients:{
      type: [Schema.Types.ObjectId],
      ref: "Ingredient"
    },
    steps:{
        type: String,
        required: [true, 'Steps are needed.']
        
      },
      owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
      }
  },
  { //! mirar si me puede servir o lo borramos
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Cocktail = model("Cocktail", CocktailSchema);

module.exports = Cocktail;
