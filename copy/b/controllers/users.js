
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/',(req,res,next) => {

    const body = req.body

    if(!body.password || body.password.length < 3){
        return res.status(400).json({error: 'password missing or invalid'})
    }

    const saltRounds = 10
    
    bcrypt.hash(body.password,saltRounds)
    .then(hashed => {
        
        delete body.password
        body.passwordHash = hashed
        const user = new User(body)
        return user.save()
    })
    .then(savedUser => {

        res.json(savedUser.toJSON())
    })
    .catch(err => next(err))
})

userRouter.get('/',(req,res) => {

    User.find({}).populate('blogs',{user: 0})
    .then(users => {
        res.json(users.map(u => u.toJSON()))
    })
})


module.exports = userRouter