const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const {
        authorization
    } = req.headers

    if (!authorization) {
        return res.status(401).send({
            error: 'You must be logged in'
        })
    }

    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({
                error: 'You must be logged.'
            })
        }

        const {
            userId
        } = payload;
        const user = await User.findById(userId)
        req.user = user

        return next()
    })
}

// "email": "test1@email",
// "password": "123"
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGIzNmVjNjdmMTgwZDVmY2I5YzFhZTMiLCJpYXQiOjE1NzIwNDAzOTB9.OMBv8i2-mt-WXtaXtripWF-TrPhfrkQrl0NGwACVJH4