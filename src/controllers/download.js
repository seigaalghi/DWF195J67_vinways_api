const path = require('path');

exports.downloadFile = (req, res) => {
  const file = req.params.file;
  console.log(file);
  try {
    const path = __dirname + '/uploads/' + file;
    res.download(path);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
