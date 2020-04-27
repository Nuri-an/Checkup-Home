const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (request, file, callback) => {
            crypto.randomBytes(6, (err, hash) => {
                if (err){
                    callback(err);
                }
                file
                const fileName = `midia_${hash.toString('hex')}.${file.mimetype.split("/")[1]}`;
                callback(null, fileName);
            });
        },
    }),
    fileFilter: (request, file, callback) => {
        const allowedMimes = [
            "image/jpg",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if(allowedMimes.includes(file.mimetype)){
            callback(null, true);
        } else{
            callback(new Error("Invalid file type."));
        }
    }
}
