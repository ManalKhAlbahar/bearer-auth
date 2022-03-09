'use strict';
require('dotenv').config();
const JWT = require("jsonwebtoken");
const SECRET = process.env.SECRET || "Manal Secret";

const signUser = (sequelize, DataTypes) => sequelize.define('signUser', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type:DataTypes.VIRTUAL ,
        get(){
            return JWT.sign({username : this.username},SECRET);
        }
    }
})
module.exports = signUser;