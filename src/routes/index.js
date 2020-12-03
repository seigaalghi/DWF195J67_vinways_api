const express = require('express');
const router = express.Router();
const { fileUpload } = require('../../middlewares/fileUpload');

// Function Import

const { getMusics, getMusic, postMusic } = require('../controllers/music');
const {
  getArtists,
  getArtist,
  postArtist,
  putArtist,
  deleteArtist,
} = require('../controllers/artist');

// Music
router.get('/musics', getMusics);
router.get('/music/:id', getMusic);
router.post('/music', fileUpload('img', 'audio'), postMusic);

// Artist
router.get('/artists', getArtists);
router.get('/artist/:id', getArtist);
router.delete('/artist/:id', deleteArtist);
router.put('/artist/:id', fileUpload('img', null), putArtist);
router.post('/artist/', fileUpload('img', null), postArtist);

// User

module.exports = router;
