const express = require('express');
const bcrypt = require('bcrypt');
const { signUser } = require('../models/index.js');
const router = express.Router();


// localhost:3000/signup >>{username:'manal',password:'test123'}
router.post ('/signup', async (req, res, next) => {
    let { username, password } = req.body;
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing >>> ', hashedPassword)
        const newUser = await signUser.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;