
//////////////////////////////////////////
///   api endpoints for managing users //
////////////////////////////////////////

const router = require('express').Router();

let User = require('../models/user.model');

// Your Challenge: Make two routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all users on record
// GET: /
// ========================================
router.get('/', async (req, res) => {
    const userList = await User.find({})
    res.send(userList)
})


// 2. add a new user
// POST /
// ========================================
router.post('/add', ({ body }, res) => {
    User.create(body)
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            res.json(err)
        })
})



module.exports = router;