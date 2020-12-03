const express = require('express');
const router = express.Router();
const { fileUpload } = require('../../middlewares/fileUpload');

// Function Import

// Artist Actions
const {
  getArtists,
  getArtist,
  postArtist,
  putArtist,
  deleteArtist,
} = require('../controllers/artist');

// Music Actions
const { getMusics, getMusic, postMusic, putMusic, deleteMusic } = require('../controllers/music');

// User Actions

// const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controllers/user');

// Music
router.get('/musics', getMusics);
router.get('/music/:id', getMusic);
router.post('/music', fileUpload('img', 'audio'), postMusic);
router.put('/music/:id', fileUpload('img', 'audio'), putMusic);
router.delete('/music/:id', deleteMusic);

// Artist
router.get('/artists', getArtists);
router.get('/artist/:id', getArtist);
router.delete('/artist/:id', deleteArtist);
router.put('/artist/:id', fileUpload('img', null), putArtist);
router.post('/artist/', fileUpload('img', null), postArtist);

// // User
// router.get('/users', getUsers);
// router.get('/user', getUser);
// router.post('/user', postUser);
// router.put('/user/:id', putUser);
// router.delete('/user/:id', deleteUser);

module.exports = router;
