const Order = require("../models/Order");
const Product = require("../models/Product");
const orderCtrl = {
  createOrder: async (req, res) => {
    const order = req.body;
    try {
      const cart = req.body.cart;
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findById(cart[i].id_product);
        if (product) {
          if (product.quantity - cart[i].number < 0) {
            return res.status(200).json({ success: false , message: "Sản phẩm đã hết!" });
          }
          let updatedQuantity = {
            quantity: product.quantity - cart[i].number,
          };
          const quantityUpdateCondition = { _id: product._id };
          updatedQuantity = await Product.findOneAndUpdate(
            quantityUpdateCondition,
            updatedQuantity,
            { new: true }
          );
        } else {
          return res
            .status(200)
            .json({ success: false, message: "Không thể tìm thấy sản phẩm trong giỏ hàng!" });
        }
      }
      const newOrder = new Order({
        ...order,
        status_order: 0,
      });
      await newOrder.save();
      res.json({ success: true, message: "Happy orders!!!!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ id_user: req.params.id })
        .populate("id_user")
        .populate("cart.id_product");
      res.json({ success: true, orders });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("id_user")
        .populate("cart.id_product");
      res.json({ success: true, orders });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("id_user")
        .populate("cart.id_product");
      res.json({ success: true, order });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { status_order, note } = req.body;
      console.log(status_order);
      console.log(note);
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        { status_order, note }
      );
      res.json({ success: true, message: "update thanh cong" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  CancelOrders: async (req, res) => {
    try {
      const { message } = req.body;
      const orders = await Order.findById(req.params.id);
      if(orders.status_order === 1 || orders.status_order === 3){
        return res.json({message: "Không thế hủy"})
      }
      const {cart} = orders
      console.log(cart);
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findById(cart[i].id_product);
        if (product) {
          let updatedQuantity = {
            quantity: product.quantity + cart[i].number,
          };
          const quantityUpdateCondition = { _id: product._id };
          updatedQuantity = await Product.findOneAndUpdate(
            quantityUpdateCondition,
            updatedQuantity,
            { new: true }
          );
        } else {
          return res
            .status(200)
            .json({ success: false, message: "Không thể tìm thấy sản phẩm trong giỏ hàng!" });
        }
      }
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        { status_order: 1, message }
      );
      res.json({ success: true, message: "hủy thanh cong" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  updateInfoUser: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      console.log(name);
      console.log(address);
      console.log(phone);
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        { name, address, phone }
      );
      res.json({ success: true, message: "update thanh cong" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const orderDeleteCondition = { _id: req.params.id };
      const deletedOrder = await Order.findOneAndDelete(orderDeleteCondition);
      if (!deletedOrder)
        return res.status(401).json({
          success: false,
          message: "Order khong tim thay",
        });

      res.json({ success: true, message: "Xoas thanh cong" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  OrdersStatistical: async (req, res) => {
    try {
      const orders = await Order.find({
        updatedAt: {
          $gte: new Date(req.body.dateStart),
          $lte: new Date(req.body.dateEnd),
        },
      });
      res.json({ success: true, orders: orders });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = orderCtrl;
