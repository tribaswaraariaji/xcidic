const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userRouters = require('./routes/userRoutes');
const taskRouters = require('./routes/taskRoutes');

app.set('secretkey', 'xcidiccrud'); //jwt secret token
// connection to mongoDB
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database Connection Connected Successfully");
})

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/users', userRouters);
app.use('/tasks', taskRouters);
app.get('/',(req,res) => res.status(200).send(
    "Hello! login manager: username(manager1/2),pass:123, employee: username(employee1/2/3/4), pass:123 :)"
    ));

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});;