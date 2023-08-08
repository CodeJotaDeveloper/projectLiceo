const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/storage/imgs/circular')
    },
    filename: function (req, file, cb) {
        let extension = file.mimetype;

        extension += "/";
        const vectorExtension = extension.split('/');
        extension = vectorExtension[1];
        cb(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
})

const upload = multer({
    storage,
})

module.exports = upload