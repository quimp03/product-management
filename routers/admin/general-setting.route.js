const express = require("express")
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const router = express()
const controller = require("../../controllers/admin/general-setting")
router.get("/general" , controller.index)

router.patch("/general", 
    upload.single("logo"),
    uploadCloud.uploadSingle, 
    controller.settingGeneralPatch
);
router.get("/slideshow",controller.slideShow);
router.patch("/slideshow",
  upload.array("slideshow", 10),
  uploadCloud.uploadMultiple,
  controller.slideShowPatch)
module.exports = router