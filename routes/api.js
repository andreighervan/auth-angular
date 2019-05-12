const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/user');
const mongoose = require('mongoose');
const db = 'mongodb://andreigh:123QQsuccess@ds357955.mlab.com:57955/authng'

mongoose.connect(db, err => {
    if (err) {
        console.log('Error ' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    console.log(userData)
    let user = new User(userData)
    user.save((error, registerUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registerUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2012-04-23T18:25:43.4112"
        },
        {
            "id": "2",
            "name": "Auto Expo 2",
            "description": "lorem ispum 2",
            "date": "2012-04-23T18:25:42.4112"
        },
        {
            "id": "3",
            "name": "Auto Expo 3",
            "description": "lorem ispum 3",
            "date": "2012-04-23T18:25:43.4114"
        }
    ]
    res.json(events);
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/special', verifyToken, (req, res) => {
    let special = [
        {
            "id": "1",
            "name": "Auto Expo",
            "description": "lorem ispum",
            "date": "2012-04-23T18:25:43.4112"
        },
        {
            "id": "2",
            "name": "Auto Expo 2",
            "description": "lorem ispum 2",
            "date": "2012-04-23T18:25:42.4112"
        },
        {
            "id": "3",
            "name": "Auto Expo 3",
            "description": "lorem ispum 3",
            "date": "2012-04-23T18:25:43.4114"
        }
    ]
    res.json(special);
})

module.exports = router