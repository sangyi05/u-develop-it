const inputCheck = require('./utils/inputCheck');
const express = require('express');
const { middleware } = require('yargs');
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);


// default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
})

//start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})