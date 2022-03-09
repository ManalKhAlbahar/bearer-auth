'use strict';

const { signUser } = require('../models/index.js')
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "Manal Secret";

const bearerAuth = async (req, res, next) => {
    if (req.headers['authorization'])
        try {
            let bearerHead = req.headers.authorization.split(' ');
            console.log('bearerHead >>> ', bearerHead);
            let token = bearerHead.pop();
            console.log('Token >>> ', token);
            if (token) {
                const parsedToken = JWT.verify(token, SECRET);
                console.log('llllllll', parsedToken);

                const user = await this.findOne({ where: { username: parsedToken.username } });
                if (user) {
                    req.token = parsedToken;
                    req.user = user;
                    next();
                }else{
                    next('invalid login user')
                }
            }}
       catch(error) {
            next('invalid login token')
        }
        else{
            next('no token here')
        }
}

          


module.exports = bearerAuth;