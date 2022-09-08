const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const { auth } = require("../middleware/auth");
// const uploadImage = require("../middleware/uploadImage");

router.post("/upload_avatar",  uploadCtrl.uploadAvatar);

module.exports = router;
