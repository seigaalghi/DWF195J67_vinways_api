const multer = require('multer');
const path = require('path');

exports.imageUpload = (fileName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          ' - ' +
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          '-' +
          new Date().getDate() +
          ' - ' +
          new Date().getHours() +
          '-' +
          new Date().getMinutes() +
          '-' +
          new Date().getSeconds() +
          '-' +
          new Date().getMilliseconds() +
          path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
      req.fileValidationError = {
        message: 'Please select image files only',
      };
      return cb(new Error('Please select image files only'), false);
    }
    cb(null, true);
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 3072000,
    },
  }).fields([
    { name: fileName, maxCount: 1 },
    { name: fileName, maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !err) {
        return res.status(400).send({
          message: 'No files selected',
        });
      }
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file size exceeded (3Mb)',
          });
        }
      }
      return next();
    });
  };
};
