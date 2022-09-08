const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    subCategories: [
      {
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", CategorySchema);
