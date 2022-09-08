const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên của bạn!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email của bạn!"],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu của bạn!"],
    },
    role: { type: Number, default: 0 }, // 0: user , 1: admin
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/phuockaito/image/upload/v1617902959/user/1_gxwhfk.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
module.exports = User;
