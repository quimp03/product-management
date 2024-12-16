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
    req.body.slideshow = []; // Khởi tạo mảng slideshow
    const uploadPromises = req.files
        .filter(file => file.fieldname === "slideshow") // Lọc file thuộc fieldname "slideshow"
        .map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    req.body.slideshow.push(result.url); // Lưu URL vào mảng slideshow
                    resolve();
                });
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        });

    // Chờ tất cả các upload hoàn thành
    Promise.all(uploadPromises)
        .then(() => next()) // Tiếp tục xử lý nếu không có lỗi
        .catch(error => {
            console.error("Error uploading slideshow:", error);
            res.status(500).json({ error: "Failed to upload slideshow", details: error.message });
        });
};