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
    imageUrl: {
        type: String
         
        
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
  { 
    timestamps: true
  }
);

const Cocktail = model("Cocktail", CocktailSchema);

module.exports = Cocktail;
