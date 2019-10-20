
//////////////////////////////////////////
///   api endpoints for managing users //
////////////////////////////////////////

/* Adding middleware necessary for express router http requests to process and imported the model (schema) necessary for the type of information sending to the 
the database.*/
const router = require('express').Router();
let User = require('../models/user.model');

// Your Challenge: Make two routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/


// 1. get all users on record
// GET: /
// ========================================
// Using the find method to showcase all of the users that are in my database and then sending the response to the client side.
router.get('/', async (req, res) => {
    const userList = await User.find({})
    res.send(userList)
})


// 2. add a new user
// POST /
// ========================================
/* Disecting the req.body to body, so that it is easily accessible to use when perfoming the create method. The create method allows the client to
create a new user in my database. After the method is executed, the server is sending back the json response of it to the client side.*/
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