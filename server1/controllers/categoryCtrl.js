const Category = require("../models/Category");
const Comments = require("../models/Comment");
const Products = require("../models/Product");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  detailCategory: async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHander("cate not found", 404));
    }
    res.status(200).json({
      success: true,
      category,
    });
  },

  // if user have role = 1 ---> admin
  // only admin can create , delete and update category
  createCategory: async (req, res) => {
    try {
      const { name, subCategories } = req.body;
      const category = await Category.findOne({ name });
      if (category) return res.status(400).json({ msg: "danh mục đã tồn tại" });
      const newCategory = new Category({
        name: name,
        subCategories: subCategories.map((item) => ({
          name: item,
        })),
      });
      await newCategory.save();
      res.json({ msg: "Tạo thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSubCategories: async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.params.name });
      if (!category) {
        return res.status(401).json({ msg: "ko tồn tại category" });
      }

      res.json({
        subCates: category.subCategories
      })
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id });
      if (!category) {
        return res.status(401).json({ msg: "ko tồn tại category" });
      }
      const products = await Products.find({ category: category.name });

      if (products) {
        products.map(async (product) => {
          const commentDeleteCondition = { id_product: product._id };
          await Comments.deleteMany(commentDeleteCondition);
        });
        const ProductDeleteCondition = { category: category.name };
        await Products.deleteMany(ProductDeleteCondition);
      }
      const CategoryDeleteCondition = { _id: req.params.id };
      await Category.findOneAndDelete(CategoryDeleteCondition);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name,subCategories } = req.body;
      console.log(subCategories)
      await Category.findOneAndUpdate({ _id: req.params.id }, { name ,subCategories:  subCategories.map((item) => ({
        name: item,
      })),});

      res.json({ msg: "Update thành công!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
