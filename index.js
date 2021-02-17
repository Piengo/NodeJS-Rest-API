require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/postRoutes');
const authRoute = require('./routes/authRoutes');
const privateRoute = require('./routes/privateRoute');

const app = express();

// listen to port
app.listen(3000);

// body data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('CONNECTED TO DB!')
);

// Routing
app.use('/posts', postsRoute);
app.use('/auth', authRoute);
app.use('/private', privateRoute);
