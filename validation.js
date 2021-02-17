const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(2).required()
})

const validation = data => {
    return userSchema.validate(data);
}

module.exports.validation = validation;