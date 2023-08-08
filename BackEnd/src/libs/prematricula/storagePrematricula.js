const multer = require('multer');

function uploadFile() {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/public/storage/prematricula')
        },
        filename: function (req, file, cb) {//NOMBRE.G / .G
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, `${file.fieldname}-${Date.now()}${extension}`)

        }
    });
    const upload = multer({
        storage,
    }).fields([
        { name: "cedStudentPhotoFrontal", maxCount: 1 },
        { name: "cedStudentPhotoDorsal", maxCount: 1 },
        { name: "cedManagerPhotoFrontal", maxCount: 1 },
        { name: "cedManagerPhotoDorsal", maxCount: 1 },
        { name: "reciboDireccion", maxCount: 1 },
        { name: "poliza", maxCount: 1 }

    ]);
    return upload;
}


module.exports = uploadFile;