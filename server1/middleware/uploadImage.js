const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    const file = req.files.file;

    if (!req.files || Object.keys(req.files).length === 0)
      return res
        .status(400)
        .json({ msg: "Không có tệp tin nào được tải lên !" });

    // if (file.size > 1024 * 1024) {
    //   removeTmp(file.tempFilePath);
    //   return res.status(400).json({ msg: "File quá lớn!" });
    // }

    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Không phải file ảnh?" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
