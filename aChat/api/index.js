
const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const connectToMongo = require('./config/db');
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const ws = require('ws');


const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
// const server = require("http").Server(app);
const port = process.env.PORT || 6000

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);


connectToMongo();
// mongoose.connect(process.env.MONGO_URL);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, auth-token, Accept");
    next();
});
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.send('test ok');
})

app.get('/profile', (req, res) => {
    // res.json('working test')
    const token = req.cookies?.token;

    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            // const { id, username } = userData;
            res.json(userData)


        })
    } else {
        res.status(401).json('no token')
    }
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username })
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password)
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id,


                })

            })

        }
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const createdUser = await User.create({
            username: username,
            password: hashedPassword
        })
        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,


            })

        })

    } catch (error) {
        if (error) throw error;
        res.status(500).json('error')

    }


})





const server = app.listen(port, () => {
    console.log(`aChat app listening at http://localhost:${port}`)
})

// extract logged in usrname and id from the cookie 
const wss = new ws.WebSocketServer({ server })
wss.on('connection', (connection, req) => {
    console.log('connected  to web socket')
    const cookies = req.headers.cookie;
    if (cookies) {
       const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='))
        // console.log(tokenCookieString)
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1]
            if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err;
                    // console.log(userData)
                    const { userId, username } = userData;
                    connection.userId = userId;
                    connection.username = username;

                })
                
            }
        }
}
    // console.log(req.headers);
    // connection.send('hello')

    // notify other users about new connected user
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
        }
            
        ))
    })

} )