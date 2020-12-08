const multer = require('multer');
const moment = require('moment');

module.exports = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `${__dirname}/../..${process.env.STORAGE_AVATARS_PATH}`);
    },
    filename(req, file, cb) {
      cb(
        null,
        `${moment().format('DD-MM-YYYY-HH-mm-ss-SSS')}-${file.originalname}`
      );
    },
  }),
  filefilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    filesize: 1024 * 1024 * 2,
  },
}).single('avatar');
