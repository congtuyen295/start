const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nhập tên"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Nhập mota"],
    },
    dep: {
      type: String,
      required: [true, "Nhập mota"],
    },
    quantity: {
      type: Number,
      required: [true, "Please so luong"],
    },
    price: {
      type: Number,
      required: [true, "Please giá"],
    },
    color: {
      type: String,
      required: [true, "Please color"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, "Nhập category"],
    },
    nsx: {
      type: String,
      required: [true, "Nhập nsx"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images:[
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
