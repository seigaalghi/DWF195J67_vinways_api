const { Music, Artist, User } = require('../../models');

// GET ALL MUSIC

exports.getMusics = async (req, res) => {
  try {
    const musics = await Music.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'artistId'],
      },
      include: [
        {
          model: User,
          as: 'likes',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'premium', 'admin', 'until', 'payment', 'cancel'],
          },
        },
        {
          model: Artist,
          as: 'artist',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });
    res.status(200).json({
      status: 'success',
      data: {
        musics,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// GET MUSIC BY ID

exports.getMusic = async (req, res) => {
  const id = req.params.id;
  try {
    const music = await Music.findAll({ include: 'artist', where: { id: id } });
    res.status(200).json({
      status: 'success',
      data: {
        music,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// POST MUSIC

exports.postMusic = async (req, res) => {
  const body = req.body;
  const file = req.files;
  console.log(body, file.img[0], file.audio[0]);
  try {
    const music = await Music.create({
      title: body.title,
      artistId: body.artistId,
      year: body.year,
      img: file.img[0].filename,
      audio: file.audio[0].filename,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      status: 'success',
      data: {
        music,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
