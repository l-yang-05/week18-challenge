
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
// router.use('*', (req, res) => {
//     console.log(req.url)
// })

router.get('/', async (req, res) => {
    const exerciseList = await Exercise.find({})
    res.send(exerciseList)
})

// 2. add a new exercise log
// POST: /add
// ========================================
router.post('/add', (req, res) => {
    let body = req.body
    console.log(req.url)
    console.log(req.baseUrl, req.method, req.originalUrl)
    Exercise.create(body)
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            res.json(err)
        })

})

// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const desc = req.body.description;
//     const duration = Number(req.body.duration);
//     const date = Date.parse(req.body.date)

//     const newExercise = new Exercise({
//         username,
//         desc,
//         duration,
//         date
//     })

//     newExercise.save()
//         .then(() => res.json('Exercise has been added'))
//         .catch(err => res.status(400).json(`Error: ${err}`))

// })


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
router.post('/update/:id', async (req, res) => {
    const updateRec = await Exercise.updateOne(
        { _id: req.params.id }, {
        $set: {
            username: req.body.username,
            description: req.body.description,
            duration: req.body.duration,
            date: Date.now()
        }
    }, { new: true }
    )
    console.log(req.params.id)
    res.send(updateRec)
})


module.exports = router;