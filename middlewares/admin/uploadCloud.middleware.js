const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
module.exports.uploadSingle =  (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url
            next()
        }
        upload(req);
    }else{
        next()
    }
}
module.exports.uploadMultiple = (req, res, next) => {
  const uploadPromises = [];

  // Upload logo nếu có
  if (req.files.logo && req.files.logo.length > 0) {
      uploadPromises.push(new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
              if (result) {
                  req.body.logo = result.url; // Lưu URL vào req.body
                  resolve();
              } else {
                  reject(error);
              }
          });
          streamifier.createReadStream(req.files.logo[0].buffer).pipe(stream);
      }));
  }

  // Upload slideshow
  for (let i = 1; i <= 5; i++) {
      if (req.files[`slideshow${i}`] && req.files[`slideshow${i}`].length > 0) {
          uploadPromises.push(new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream((error, result) => {
                  if (result) {
                      if (!req.body.slideshow) {
                          req.body.slideshow = [];
                      }
                      req.body.slideshow.push(result.url); // Lưu URL vào mảng slideshow
                      resolve();
                  } else {
                      reject(error);
                  }
              });
              streamifier.createReadStream(req.files[`slideshow${i}`][0].buffer).pipe(stream);
          }));
      }
  }

  // Chờ tất cả các upload hoàn thành
  Promise.all(uploadPromises)
      .then(() => {
          next(); // Tiếp tục xử lý nếu không có lỗi
      })
      .catch(error => {
          console.error(error);
          res.status(500).send("Error uploading images");
      });
};