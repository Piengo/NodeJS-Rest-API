const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validation = require('../validation')

const router = express.Router();

router.post('/register', async (req, res) => {

    // validating new user data
    const { error } = validation.validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if user exists
    try {
        const userExists = await User.findOne({email: req.body.email});
        if (userExists) return res.status(400).send('User already exists');
    } catch (error) {
        console.log(error);
        return res.send('something went wrong');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save()
        const response = {
            id: savedUser._id,
            email: savedUser.email
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/login', async (req, res) => {

    // validating new user data
    const { error } = validation.validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User does not exist');

    // checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // create and assign token
    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresInMinutes: 1});
    res.header('auth-token', token).send({'auth-token': token});

});

module.exports = router;