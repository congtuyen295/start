const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl");

router.post("/createOrder", orderCtrl.createOrder);
router.get("/getorders/:id", orderCtrl.getOrders);
router.get("/getorder/:id", orderCtrl.getOrder);
router.get("/getallorders/", orderCtrl.getAllOrders);
router.put("/updatestatus/:id", orderCtrl.updateStatus);
router.put("/cancelorders/:id", orderCtrl.CancelOrders);
router.put("/updateuserinfo/:id", orderCtrl.updateInfoUser);
router.delete("/deleteorder/:id", orderCtrl.deleteOrder);
router.post("/thongke", orderCtrl.OrdersStatistical);

module.exports = router;