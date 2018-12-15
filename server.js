const express = require('express');

// trabajo con BD
const mongoose = require('mongoose');

// Routes imports
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();



//----------------------------------
const db = require('./config/keys').mongoURI;
// connect to MONGO DB
mongoose
    .connect(db)
    .then(()=>{
        console.log('Mongo DB connected')
    })
    .catch(err => console.log('err', err))
//----------------------------------





app.get('/', (req, res) => {
    res.send('Hola');
});


// Use Routes |-----------------------
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
//------------------------------------

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));