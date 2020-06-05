const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const event = require('../models/todo')

const authUser = require('../middleware/authUser')


router.post('/', authUser, async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { task, dueDate, description, taskType, status } = req.body
    try {
        await event.create({
            userId: req.user._id, task, dueDate, description, taskType, status
        })
        res.status(201).json({ status: 201, message: 'Task created Successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/', async (req, res) => {
    let events
    events = await event.aggregate([

        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo'
            }
        }, {
            $sort: {
                createdAt: -1
            }
        }
    ])

    res.json({ status: 200, events })
})

module.exports = router