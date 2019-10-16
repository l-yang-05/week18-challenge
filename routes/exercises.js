
/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////

const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all exercise logs on record
// GET: /
// ========================================
router.get('/', async (req, res) => {
    const exerciseList = await Exercise.find({})
    res.send(exerciseList)
})

// 2. add a new exercise log
// POST: /add
// ========================================
router.post('/add', ({ body }, res) => {
    Exercise.create(body)
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            res.json(err)
        })
})

// 3. retrieve a specfic exercise log
// GET: /:id
// ========================================
router.get('/:id', async (req, res) => {
    let { id } = req.params.id
    const exerciseList = await Exercise.findById({ _id: id })
    res.send(exerciseList)
})

// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================
router.delete('/:id', async (req, res) => {
    const exerciseList = await Exercise.deleteOne({ _id: req.params.id })
    res.send(exerciseList)
})

// 5. retrieve a specific exercise log and update it 
// with information sent by client on req body
// POST: /update/:id
// ========================================
router.put('/update/:id', async (req, res) => {
    const updateRec = await Exercise.findByIdAndUpdate(req.params.id,
        {
            username: req.body.username,
            description: req.body.description,
            duration: req.body.duration,
            date: Date.now()

        }, { new: true }
    )
    res.send(updateRec)
})


module.exports = router;