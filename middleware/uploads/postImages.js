const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { STORAGE_PATH, STORAGE_POST_IMAGES_PATH } = process.env;

      cb(null, `${__dirname}/../..${STORAGE_PATH + STORAGE_POST_IMAGES_PATH}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.basename(file.originalname));
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.match(/png|jpg|jpeg/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).array('files[]', 3);

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);

      return res.json({ errors: { files: 'Invalid request' } });
    }

    next();
  });
};
