const { User } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =================================================================================
// REGISTER
// =================================================================================

exports.register = async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ ...body }, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email already exist',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_TOKEN
    );

    res.status(200).json({
      status: 'success',
      message: 'Registered successfully',
      data: {
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
