const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express()

router.use(requireAuth)

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({
        userId: req.user._id
    })
    res.send(tracks)
})

router.post('/tracks', async (req, res) => {
    const {
        name,
        locations
    } = req.body

    if (!name || !locations) return res.status(422).send({
        error: 'Must provide name and locations'
    })

    try {
        const track = new Track({
            name,
            locations,
            userId: req.user._id
        })
        await track.save()
        res.send(track)
    } catch (er) {
        console.log(er)
        res.status(422).send({
            error: 'error with track'
        })
    }
})

module.exports = router