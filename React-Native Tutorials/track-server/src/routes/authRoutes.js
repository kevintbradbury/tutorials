const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        const user = new User({
            email,
            password
        })
        await user.save()

        const token = jwt.sign({
            userId: user._id
        }, 'MY SECRET KEY')

        res.send({
            token
        })
    } catch (e) {
        res.status(422).send(e.message)
    }
})

router.post('/signin', async (req, res) => {
    console.log('signin ()')
    const {
        email,
        password
    } = req.body

    console.log('signin-1', email, password)

    if (!email || !password) {
        console.log('signin-2')
        return res.status(422).send({
            error: 'Must provide email and password'
        })
    }

    const user = await User.findOne({
        email
    })
    let error = {
        error: 'Invalid password or email'
    }

    if (!user) {
        console.log('signin-3')
        return res.status(404).send(error)
    }

    try {
        console.log('signin-4')
        await user.comparePassword(password);
        const token = jwt.sign({
            userId: user._id
        }, 'MY_SECRET_KEY')
        res.send({
            token
        })
    } catch (err) {
        console.log('signin-5')
        console.log(err)
        return res.status(422).send(error)
    }

})


module.exports = router