const express = require('express');
const verify = require('./verifyToken');

const router = express.Router();

router.get('/', verify, (req, res) => {
    // can use commented code to get user
    // res.send(req.user);
    return res.status(200).send('on a private route');
})


module.exports = router;