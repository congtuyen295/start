const mongoose = require("mongoose");
const { Schema } = mongoose;
const newComment = mongoose.Schema(
  {
    id_product: { type: String, required: true },
    id_user: { type: Schema.Types.ObjectId, ref: "user" },
    content: { type: String, required: true },
    rating: {
      type: Number,
      default: 0,
    },
    reply: [
      {
        id_user: { type: Schema.Types.ObjectId, ref: "user" },
        content: { type: String },
        createAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", newComment);
