'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {signUser} = require ('../models/index.js')
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "Manal Secret";

const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const user = await signUser.findOne({ where: { username: username } });
            const validPass = await bcrypt.compare(password, user.password);
            if (validPass) {
                req.user = user 
                let newToken = JWT.sign({username:user.username},SECRET,);
                user.token = newToken;
                res.status(200).json(user)
                next();
            } else {
                next('invalid login Password')
            }
        }} catch(error) {
            next('invalid login Username')
        }

}
   
module.exports = basicAuth;