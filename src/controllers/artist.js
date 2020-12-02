const { Artist } = require('../../models');
const Joi = require('joi');

// GET ALL ARTIST

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({ include: 'musics' });
    res.status(200).json({
      status: 'success',
      data: {
        artists,
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

// GET ARTIST BY ID

exports.getArtist = async (req, res) => {
  const id = req.params.id;
  try {
    const artist = await Artist.findOne({ include: 'musics', where: { id: id } });
    res.status(200).json({
      status: 'success',
      data: {
        artist,
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

// POST ARTIST

exports.postArtist = async (req, res) => {
  const body = req.body;
  const file = req.files;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      start: Joi.number().required(),
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

    const artist = await Artist.create({
      name: body.name,
      img: file.img[0].filename,
      age: body.age,
      type: body.type,
      start: body.start,
    });

    if (!artist) {
      return res.status(400).send({
        status: 'failed',
        error: {
          message: 'Failed to add artist please try again',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        artist,
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

// PUT ARTIST

exports.putArtist = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.files;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      start: Joi.number().required(),
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
    const artist = await Artist.update(
      {
        name: body.name,
        img: file.img[0].filename,
        age: body.age,
        start: body.start,
        type: body.type,
        updatedAt: new Date(),
      },
      {
        include: 'musics',
        where: { id: id },
      }
    );

    if (!artist) {
      return res.status(400).send({
        status: 'failed',
        error: {
          message: 'Failed to edit artist please try again',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        artist,
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
exports.deleteArtist = async (req, res) => {
  const id = req.params.id;
  try {
    await Artist.destroy({ where: { id: id } });
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Deleted Successfuly',
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
