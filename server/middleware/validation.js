const Joi = require('joi');

const validateProject = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().max(200),
    description: Joi.string().required().max(2000),
    technologies: Joi.array().items(Joi.string()).max(20),
    image: Joi.string().uri().allow(''),
    github: Joi.string().uri().allow(''),
    live: Joi.string().uri().allow('')
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
    bio: Joi.string().max(500),
    avatar: Joi.string().uri().allow(''),
    skills: Joi.array().items(Joi.string()).max(50)
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

const validateUserUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100),
    bio: Joi.string().max(500),
    avatar: Joi.string().uri().allow(''),
    skills: Joi.array().items(Joi.string()).max(50)
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = {
  validateProject,
  validateUser,
  validateUserUpdate
};
