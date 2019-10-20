
////////////////////////////////
////     Road to Hire      ////
///     LifeSports App     ///
/////////////////////////////

// Here I am importing the necessary middleware needed to use mongoose and express to build the server.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

/* Here I am assinging app to the express object so that I will be able to use express thorughout my application. I am also assigning 
my env variables, such as the port the app will be hosted on and my mongodb atlas connection. */
const app = express();
const port = process.env.PORT || 5000;
let uri = process.env.ATLAS_URI


// Here I am registering my middleware so that I will be able to use them throughout the application.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: accessLogStream }))

// Serve up static assets (heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  uri = process.env.ATLAS_URI  // connection string for Atlas here  
} else {
  uri = process.env.ATLAS_URI  // connection string for Atlas here
  console.log(process.env.PORT)
}

// Here I am setting up the connection to my database to the cloud (mongodb atlas)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection is live");
})

// Here I am registering the api catalogue needed for this application
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Creating live connection to reactjs app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Here I am hosting my application on a port that I defined earlier with environment variables.
app.listen(port, () => {
  console.log(`Magic happens running on port: ${port}`);
});
