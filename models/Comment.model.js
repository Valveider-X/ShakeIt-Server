const {Schema, model} = require("mongoose")

const CommentSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        cocktail: {
            type: Schema.Types.ObjectId,
            ref: "Cocktail"
        },
        description: {
            type: String,
            required: [true, "Description is required."]
        }
    },
    {
        timestamps: true
    }
)
const Comment = model("Comment", CommentSchema)

module.exports = Comment