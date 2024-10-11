const express = require("express")
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const router = express()
const controller = require("../../controllers/admin/general-setting")
router.get("/general" , controller.index)

router.patch("/general", 
    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'slideshow1', maxCount: 1 },
      { name: 'slideshow2', maxCount: 1 },
      { name: 'slideshow3', maxCount: 1 },
      { name: 'slideshow4', maxCount: 1 },
    ]), 
    uploadCloud.uploadMultiple, 
    controller.settingGeneralPatch
  );
  
module.exports = router