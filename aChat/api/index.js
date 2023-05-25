
const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const { createServer } = require("http");
const mongoose = require('mongoose');
const connectToMongo = require('./config/db');
const User = require('./models/User')
const Message = require('./models/Message')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const ws = require('ws');
const fs = require('fs');
var _ = require('lodash');
// const socket = require("socket.io");
const { Server } = require("socket.io");

const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
// const server = require("http").Server(app);
const port = process.env.PORT || 6000
var uniqBy = require('lodash.uniqby');

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
let users = [];
let filteredUsers = [];
let finalUsers = [{}];
let count = 0;
let uniqueF = [];
var allUsers;
// users.push({ username: 'test', userId: 'test' });
var id = null;
var newA = null;
var mText = [];
var newmText = [];
mTextSring = "";
// finalUsers.push({ username: 'test', userId: 'test' });
// const removeUser = (id) => {
//     const index = uniqueF.findIndex((user) => {
//         user.userId === id

//     });
//     console.log(index);

//     if (index === -1) {
//         return uniqueF.splice(index, 1)[0];
//     } else {
//         // console.log("not sure ")
//     }
// }


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
    // origin: process.env.CLIENT_URL
    origin: '*'
}))

// app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));



const httpServer = createServer(app);

httpServer.listen(port);
const wss = require("socket.io")(httpServer, {
    cors: {

    }
});

app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;


    const userData = await getUserDataFromParams(req)
    // console.log(userData);
    // res.json(req.params);
    // console.log(userId)
    const ourUserId = userData.userId;

    console.log(userId, ourUserId);
    const messages = await Message.find({
        sender: { $in: [userId, ourUserId] },
        recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });
    res.json(messages);
    // console.log(messages)
})

app.get('/test', (req, res) => {
    res.send('test ok');
})

app.get('/profile', async (req, res) => {
    // res.json('working test')
    const token = req.cookies?.token;


    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            // console.log(userData)

            const { username } = userData;
            wss.on('connection', (socket) => {

                // socket.sendBuffer = [];
                // console.log(`⚡: ${socket.id} user just connected!`);
                //    const count = wss.engine.clientsCount;
                // console.log(count)

                socket.on('newUser', (user) => {

                    // for (let i = 0; i < users.length; i++) {
                    //     // console.log("same username found")
                    //     if (users[i].username === user.username) {
                    //         console.log("user same")
                    //         // console.log("test user not found")
                    //         // filteredUsers.push(user);
                    //     } else {
                    //         console.log("user not equal")
                    //         count++;
                    //         console.log(count)


                    //         function fUser(item) {
                    //             if (item.userId === socket.id) {
                    //                 console.log("user same")

                    //             } else {
                    //                 users.push(item);
                    //                 console.log("user not same")
                    //             }
                    //         }
                    //         users.map(fUser)

                    //         // users.push(user);
                    //     }

                    // }
                    if (newA === null) {
                        users.push(user);
                        uniqueF = [...new Map(users.map((m) => [m.userId, m])).values()];


                        id = user.userId;

                        wss.emit('newUserResponse', users)

                    } else {
                        newA.push(user);
                        uniqueF = [...new Map(newA.map((m) => [m.userId, m])).values()];


                        id = user.userId;

                        wss.emit('newUserResponse', newA)

                    }


                    // uniqueF = [...new Map(users.map((m) => [m.userId, m])).values()];
                    // wss.emit('newUserResponse', uniqueF)
                    // console.log(user.userId);
                    // console.log(uniqueF)
                })
                // var allConnectedClients = Object.keys(wss.socket.connected);
                // console.log(user)
                // console.log(user.username)
                // socket.sendBuffer = [];
                // console.log(user.username)





                // console.log(users)

                // wss.emit('newUserResponse', users)


                // console.log(users.length);

                // var aquaticCreatures = creatures.filter(function (creature) {
                //     return creature.habitat == "Ocean";
                // });

                // console.log(aquaticCreatures);

                //Adds the new user to the list of users


                // console.log("new user connected" + user.username)
                // console.log(users.map(c => c.username))
                //Sends the list of users to the client

                // console.log(typeof (users));
                // [...users].forEach(client => {
                //     client.emit()

                // })
                // wss.emit('allUsers', {
                //     online: users

                // })
                // console.log((wss.engine.clients))


                // });
                // wss.on('uId', (userData) => {
                //     const messageData = JSON.parse(userData.toString());
                //     const { userId } = messageData;
                //     console.log(userId)
                //     newA = _.pullAllBy(uniqueF, [{ 'socketId': userId }], 'socketId');
                //     // console.log(newA);
                //     uniqueF = newA;


                // })

                // var allConnectedClients = Object.keys(wss.sockets.connected);
                // console.log(allConnectedClients)
                socket.on('message', async (message) => {
                    const messageData = JSON.parse(message.toString());
                    const { recipient, text, file, userId } = messageData;
                    id = userId;
                    console.log(id)
                    // console.log(messageData)
                    let filename = null;
                    if (file) {
                        console.log('size', file.data.length);
                        const parts = file.name.split('.');
                        const ext = parts[parts.length - 1];
                        filename = Date.now() + '.' + ext;
                        const path = __dirname + '/uploads/' + filename;
                        const bufferData = new Buffer(file.data.split(',')[1], 'base64');
                        fs.writeFile(path, bufferData, () => {
                            console.log('file saved:' + path);
                        });
                    }
                    if (recipient !== userId) {
                        console.log("different users")
                        if (recipient && (text || file)) {
                            // mText.push(messageData)
                            // newmText = [...new Map(mText.map((m) => [m.text, m])).values()];

                            // console.log(newmText)





                            if (mTextSring !== text) {
                                var messageDoc = new Message({

                                    sender: id,
                                    recipient,
                                    text,
                                    file: file ? filename : null,

                                });
                                messageDoc.save().then(() => {
                                    console.log("message saved in database successfully");
                                    wss.emit('messageFromOtherUsers', {
                                        text,
                                        sender: id,
                                        recipient,
                                        file: file ? filename : null,
                                        _id: messageDoc._id,
                                    })
                                    // console.log(text, id, recipient, messageDoc._id)

                                }).catch((err) => {
                                    console.log(err);
                                })



                                // console.log('created message');
                                // [...wss.clients]
                                //     .filter(c => c.userId === recipient)
                                //     .forEach(c => c.send(JSON.stringify({
                                //         text,
                                //         sender: connection.userId,
                                //         recipient,
                                //         file: file ? filename : null,
                                //         _id: messageDoc._id,
                                //     })));







                                mTextSring = text;
                            }




                        }
                    }

                });



                // console.log(users)
                socket.on('disconnect', () => {

                    // const count = wss.engine.clientsCount;
                    // console.log(count)

                    // users.splice(users.indexOf(socket), 1);
                    // console.log(users)

                    // console.log('🔥: A user disconnected' + socket.id);
                    //      var allConnectedClients = Object.keys(wss.sockets.connected);
                    // console.log(allConnectedClients)

                    // console.log('🔥: A user disconnected');
                    //Updates the list of users when a user disconnects from the server
                    // console.log(typeof(users));
                    // //Sends the list of users to the client
                    // console.log(users)
                    // wss.emit('newUserResponse', users);
                    // var allUsers = finalUsers.splice(finalUsers.indexOf(socket.username), 1);

                    // socket.disconnect();
                    // allUsers = uniqueF.filter((user) => user.userId !== socket.userId);
                    // finalUsers = users.filter((user) => user.userId !== socket.userId);
                    // console.log(allUsers)
                    console.log("client disconnected")
                    // var index = uniqueF.findIndex(x => x.userId === socket.id);
                    // let ind = uniqueF.findIndex(item => { return item.userId == socket.id });
                    // var filtered = uniqueF.filter(function (el) { return el.userId != socket.id; });
                    // console.log(uniqueF)
                    // console.log(filtered)
                    // var newUserList = removeUser(socket.userId);
                    // console.log(newUserList);
                    // console.log(allUsers)
                    // uniqueF.map(finalUser)
                    // function finalUser(item) {
                    //     if (item.userId === socket.id) {
                    //         console.log("user id found")
                    //     }

                    // }
                    var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];

                    newA = _.pullAllBy(uniqueF, [{ 'socketId': socket.id }], 'socketId');
                    // console.log(newA);
                    uniqueF = newA;
                    wss.emit('newUserResponse', newA)
                    // console.log(newA)
                    // console.log(socket.id)
                    // console.log(uniqueF)
                    // // arr = arr.filter(item => item !== value)
                    // let value = 3

                    // let arr = [1, 2, 3, 4, 5, 3]

                    // arr = arr.filter(item => item !== value)

                    // console.log(finalUsers)

                });

                // console.log(users);




            });

            // wss.on('connection', (socket) => {
            //     console.log("new user connected" + socket.id)

            // const { userId, username } = userData;

            // socket.data.userId = userId;
            // socket.data.username = username;

            // socket.emit('message', {
            //     online: {
            //         username,
            //         userId
            //     }

            // });

            // console.log((socket.data))

            // });



            res.json(userData)





        })
    } else {
        res.status(401).json('no token')

    }
})


app.get('/people', async (req, res) => {
    const users = await User.find({}, { '_id': 1, username: 1 });
    res.json(users)

})
app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const foundUser = await User.findOne({ username })
    if (foundUser) {
        // console.log(username);

        const passOk = bcrypt.compareSync(password, foundUser.password)
        if (passOk) {
            // console.log("password ok")
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                if (err) throw err;

                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id,


                })

            })

        }
    }
})

app.post('/logout', (req, res) => {
    console.log(newA)
    // wss.emit('newUsers', newA)
    res.cookie('token', "", { sameSite: 'none', secure: true }).json('ok')


    console.log("logged out")


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









// const io = new Server(port, { /* options */ });

// io.on("connection", (socket) => {
//     console.log('client connected')
// });
// extract logged in usrname and id from the cookie 
