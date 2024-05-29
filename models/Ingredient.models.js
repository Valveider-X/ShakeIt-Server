const {Schema, model} = require("mongoose")
const IngredientSchema = new Schema (
    {
        name:{
            type: String,
            required: [true, "Name is required."],
            trim: true
        },
        hasAlcohol: {
            type: Boolean,
            default: false
        },
        alcoholGraduation: {
            type: String
        },
        img:{
            type: String
        },
        description:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Ingredient = model("Ingredient", IngredientSchema)
module.exports = Ingredient