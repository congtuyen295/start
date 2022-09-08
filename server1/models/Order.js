const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = mongoose.Schema(
  {
    id_user: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    address: { type: String },
    phone: { type: String },
    totalSum: { type: Number, required: true },
    cart: [
      {
        id_product: { type: Schema.Types.ObjectId, ref: "Product" },
        number: { type: Number },
      },
    ],
    payment: { type: Number, required: true }, // 0 nhận hàng khi thanh toan
    status_order: { type: Number, required: true },// 0 pending 1 huy 2 dang giao 3 thanh cong
    message: { type: String, default: "" }, // người dùng
    note: { type: String, default: "" }, // admin ghi
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
