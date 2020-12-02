const express = require('express');
const router = express.Router();
const { imageUpload } = require('../../middlewares/imageUpload');

// Function Import

const { getMusics, getMusic, postMusic } = require('../controllers/music');
const { getArtists, getArtist, postArtist, putArtist, deleteArtist } = require('../controllers/artist');

// Music //
router.get('/musics', getMusics);
router.get('/music/:id', getMusic);
router.post('/music', postMusic);

// Artist
router.get('/artists', getArtists);
router.get('/artist/:id', getArtist);
router.delete('/artist/:id', deleteArtist);
router.put('/artist/:id', imageUpload, putArtist);
router.post('/artist/', imageUpload('img'), postArtist);

module.exports = router;
