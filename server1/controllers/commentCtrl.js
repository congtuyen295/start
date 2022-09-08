const Comments = require("../models/Comment");
const Products = require("../models/Product");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const commentCtrl = {
  getComments: async (req, res) => {
    try {
      const features = new APIfeatures(
        Comments.find({ id_product: req.params.id })
          .populate("id_user")
          .populate("reply.id_user"),
        req.query
      )
        .sorting()
        .paginating();
      const comments = await features.query;
      res.json({
        status: "success",
        result: comments.length,
        comments,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const { id_user, content, id_product, rating } = req.body;
      console.log(req.body);
      const newComment = new Comments({
        id_user,
        content,
        id_product,
        rating,
      });
      await newComment.save();

      if (rating && rating !== 0) {
        const product = await Products.findById(id_product);
        if (!product)
          return res.status(400).json({ msg: "Product does not exist." });
        let num = product.numOfReviews;
        let rate = product.ratings;
        let id = product._id;

        await Products.findOneAndUpdate(
          { _id: id },
          {
            ratings: Number.parseInt(rate) + Number.parseInt(rating),
            numOfReviews: num + 1,
          }
        );
      }
      return res.status(200).json({ msg: "cmt ok!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  replyComment: async (req, res) => {
    try {
      const { id_user, content, createAt } = req.body;
      const comment = await Comments.findById(req.params.id_comment);
      if (comment) {
        comment.reply.push({
          id_user: id_user,
          content: content,
          createAt: createAt,
        });
        await comment.save();
        return res.status(200).json({ msg: "rep ok" });
      } else {
        return res.status(400).json({ msg: "rep does not exist." });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findById(req.params.id);
      const product = await Products .findById(comment.id_product);
      let num = product.numOfReviews;
      let rate = product.ratings;
      let id = product._id;
      await Products.findOneAndUpdate(
        { _id: id },
        {
          ratings: Number.parseInt(rate) - Number.parseInt(comment.rating),
          numOfReviews: num - 1,
        }
      );

      const commentDeleteCondition = { _id: req.params.id };
      const deletedComment = await Comments.findOneAndDelete(
        commentDeleteCondition
      );
      if (!deletedComment)
        return res.status(401).json({
          success: false,
          message: "Comment not found",
        });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = commentCtrl;
