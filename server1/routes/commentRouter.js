const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/getComments/:id", commentCtrl.getComments);
router.delete("/deleteComment/:id", commentCtrl.deleteComment);
router.post("/comment", commentCtrl.createComment);
router.post("/repcomment/:id_comment", commentCtrl.replyComment);
module.exports = router;
