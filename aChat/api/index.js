
const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const connectToMongo = require('./config/db');
const User = require('./models/User')
const Message = require('./models/Message')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const ws = require('ws');
const fs = require('fs');


const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
// const server = require("http").Server(app);
const port = process.env.PORT || 6000

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);


connectToMongo();

async function getUserDataFromParams(req) {
    return new Promise((resolove, reject) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) throw err;
                // const { id, username } = userData;
                // console.log(userData)
                resolove(userData)


            })
        } else {
            reject('no token')
        }
    })

}

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
app.use('/uploads', express.static(__dirname + '/uploads'));

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
app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;
    const  userData  = await getUserDataFromParams(req)
    // console.log(userData);
    // res.json(req.params);
    // console.log(userId)
    const ourUserId = userData.userId;
    // console.log(userId, ourUserId);
    const messages = await Message.find({
        sender: { $in: [userId, ourUserId] },
        recipitent: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });
    res.json(messages);
})

app.get('/people', async (req, res) => {
    const users = await User.find({}, { '_id': 1, username: 1 });
    res.json(users)
    
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


                } )

            })

        }
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', "", { sameSite: 'none', secure: true }).json('ok')
    
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

    function notifyAboutOnlinePeople() {
        // notify other users about new connected user
        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
            }

            ))
        })
}

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

    
    connection.on('message', async (message) => {
        const newMessage = JSON.parse(message.toString());
        console.log(newMessage)
        const { recipitent, text, file } = newMessage;
        let filename = null;
        if (file) {
            // console.log({file})
            const parts = file.name.split('.');
            const ext = parts[parts.length - 1];
             filename = Date.now() + "." + ext;
            const path = __dirname + '/uploads/' + filename
            const bufferData = new Buffer(file.data.split(',')[1], 'base64' )
            fs.writeFile(path, bufferData, () => {
                console.log('file saved' + path)
            } )
        }
        if (recipitent && ( text || file)) {

            const messageDoc = await Message.create({
                sender: connection.userId,
                recipitent,
                text,
                file: file ? filename : null
            });
           



            [...wss.clients]
                .filter(c => c.userId === recipitent)
                .forEach(c => c.send(JSON.stringify({
                    text,
                    sender: connection.userId,
                    _id: messageDoc._id,
                    recipitent,
                    file: file ? filename : null,
                })))

        }
    })

    notifyAboutOnlinePeople();
    connection.onclose = (event) => {
        console.log("The connection has been closed successfully.");
        connection.terminate();
        notifyAboutOnlinePeople();
    };

})

