const multer = require('multer');

function uploadFile() {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/public/storage/imgs/evento')
        },
        filename: function (req, file, cb) {//NOMBRE.G / .G
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, `${file.fieldname}-${Date.now()}${extension}`)

        }
    });
    const upload = multer({
        storage,
    }).fields([
        { name: "eventImag", maxCount: 1 },


    ]);
    return upload;
}


module.exports = uploadFile;
