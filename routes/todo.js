const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Task = require('../models/todo')

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


router.delete('/:id', authUser, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })
        if (!task)
            return res.status(404).json({ status: 404, message: 'Task not found' })
        await complaint.remove()
        res.json({ status: 200, message: 'Deleted Successfully' })
    } catch (err) {
        if (err.message.includes('Cast to ObjectId failed for value'))
            return res.status(404).json({ status: 404, message: 'task not found' })
        console.log(err)
        res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
})

module.exports = router