
/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////

/* Adding middleware necessary for express router http requests to process and imported the model (schema) necessary for the type of information sending to the 
the database.*/
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all exercise logs on record
// GET: /
// ========================================
// Using the find method to showcase all of the exercise logs in my database and then sending the response to the client side.
router.get('/', async (req, res) => {
    const exerciseList = await Exercise.find({})
    res.send(exerciseList)
})

// 2. add a new exercise log
// POST: /add
// ========================================
/* Setting the req.body to a variable called body, so that it is easily accessible to use when perfoming the create method. The create method allows the client to
create a new record (log) in my database. After the method is executed, the server is sending back the json response of it to the client side.*/
router.post('/add', (req, res) => {
    let body = req.body
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
/* Here I am disecting req.params.id to a variable called id. Then I am applying the method findById to find the id of a certain log made in my database to send back
to the client */
router.get('/:id', async (req, res) => {
    let { id } = req.params.id
    const exerciseList = await Exercise.findById({ _id: id })
    res.send(exerciseList)
})

// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================
// I am applying the deleteOne method to find a specific log in my database and then deleting the respective item from my database. 
router.delete('/:id', async (req, res) => {
    const exerciseList = await Exercise.deleteOne({ _id: req.params.id })
    res.send(exerciseList)
})

// 5. retrieve a specific exercise log and update it 
// with information sent by client on req body
// POST: /update/:id
// ========================================
/* Here I am applying the updateOne method to select a specific log in my database so that the client will be able to update a certain field in the log. I am then
sending the updated log back to the client. */
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