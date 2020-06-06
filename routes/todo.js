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
        await Task.create({
            email: req.user.email, task, dueDate, description, taskType, status
        })
        res.status(201).json({ status: 201, message: 'Task created Successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})

router.get('/', async (req, res) => {
    let tasks
    tasks = await Task.aggregate([

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

    res.json({ status: 200, tasks })
})


router.get('/:email', async (req, res) => {
    let tasks
    tasks = await Task.find({
        email : req.params.email
    })

    res.json({ status: 200, tasks })
})


router.get('/analysis/:email', async (req, res) => {
    
    let events

    events = await Task.find({
        email:req.params.email
    })

    let Personal = events.filter(e => e.taskType === 'Personal').length
    let Work = events.filter(e => e.taskType === 'Work').length
    let Shopping = events.filter(e => e.taskType === 'Shopping').length
    let Other = events.filter(e => e.taskType === 'Other') .length
    console.log(Personal)
    console.log(Work)
    console.log(Shopping)
    console.log(Other)

    res.json({ status: 200, Personal,Work,Shopping,Other })
})

router.get('/status/:email', async (req, res) => {
    
    let events

    events = await Task.find({
        email:req.params.email
    })

    let Ongoing = events.filter(e => e.status === 0).length
    let Completed = events.filter(e => e.status === 1).length
    console.log(Ongoing)
    console.log(Completed)
    

    res.json({ status: 200, Ongoing,Completed })
})



router.post('/analysis', async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { email } = req.body
    try {
        let events

    events = await Task.find({
        email:email
    })

    let Personal = events.filter(e => e.taskType === 'Personal').length
    let Work = events.filter(e => e.taskType === 'Work').length
    let Shopping = events.filter(e => e.taskType === 'Shopping').length
    let Other = events.filter(e => e.taskType === 'Other') .length
    
        res.status(201).json({ status: 201, message: 'Analysis!',Personal,Work,Shopping,Other })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
})


router.post('/status', async (req, res) => {
    // console.log(req.body)
    // res.json({ status: 200, message: 'Done' })
    const { email } = req.body
    try {
        let events

    events = await Task.find({
        email:email
    })

    let Ongoing = events.filter(e => e.status === 0).length
    let Completed = events.filter(e => e.status === 1).length
    
        res.status(201).json({ status: 201, message: 'Status!',Ongoing,Completed })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, error: err })
    }
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