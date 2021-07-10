const multer = require('multer');

//Because Multer provides mime type and we will get the extension by accessing this object
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}

const fileUploadConfig = multer({
    limits:500000,

    // The disk storage engine gives you full control on storing files to disk.
    storage:multer.diskStorage({
        destination:(req, fileExtracted, callBack)=>{
            callBack(null, 'uploads/product_images');
        },
        filename:(req, fileExtracted, callBack)=>{
            const fileName = fileExtracted.originalname.split(".")[0].split(" ").join('-');
            const extensionOfFile = MIME_TYPE_MAP[fileExtracted.mimetype];
            callBack(null, `${fileName}-${Date.now()}.${extensionOfFile}`);
        }
    }),
    
    //Filter for jpeg, jpg, png.
    fileFilter:(req, fileExtracted, callBack)=>{
        const isValid = !!MIME_TYPE_MAP[fileExtracted.mimetype];
        const error = isValid ? null : new Error('Invalid MIME Type!');
        callBack(error, isValid)
    }    
});

module.exports = fileUploadConfig;