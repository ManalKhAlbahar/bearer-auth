'use strict';

require('dotenv').config();

const server = require('./src/server');
const {db} = require('./src/auth/models/index.js')

    db.sync().then(()=>{
    server.start( 3008);})
.catch(console.error) 

//process.env.PORT ||