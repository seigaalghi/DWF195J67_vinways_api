const { Music, Artist, User } = require('../../models');
const Joi = require('joi');

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
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name', 'email'],
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
    const music = await Music.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name', 'email'],
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

    if (!music) {
      res.status(400).json({
        status: 'success',
        message: `No Music Found with ID of ${id}`,
      });
    }

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
  console.log(body);
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      artistId: Joi.number().required(),
      year: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        error: {
          message: error.details.map((detail) => detail.message),
        },
      });
    }

    const music = await Music.create({
      title: body.title,
      artistId: body.artistId,
      year: body.year,
      img: file.img[0].filename,
      audio: file.audio[0].filename,
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

// EDIT MUSIC

exports.putMusic = async (req, res) => {
  const body = req.body;
  const file = req.files;
  const id = req.params.id;
  console.log(body);
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      artistId: Joi.number().required(),
      year: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        error: {
          message: error.details.map((detail) => detail.message),
        },
      });
    }

    const music = await Music.update(
      {
        title: body.title,
        artistId: body.artistId,
        year: body.year,
        img: file.img[0].filename,
        audio: file.audio[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const response = await Music.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'artistId'],
      },
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name', 'email'],
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
        music: response,
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
