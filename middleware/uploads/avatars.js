const multer = require('multer');
const path = require('path');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const { STORAGE_PATH, STORAGE_AVATARS_PATH } = process.env;

    cb(null, `${__dirname}/../..${STORAGE_PATH + STORAGE_AVATARS_PATH}`);
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    cb(null, `${date}-${file.originalname}`);
  },
});


const filefilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  filesize: 1024 * 1024 * 2,
};

const upload = multer({ storage, filefilter, limits }).single('avatar');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);

      return res.json({ errors: { files: 'Invalid request' } });
    }

    next();
  });
};
