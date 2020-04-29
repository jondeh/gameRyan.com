require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    session = require('express-session'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    port = SERVER_PORT,
    massive = require('massive'),
    app = express(),
    puzzCtrl = require('./puzzleController'),
    authCtrl = require('./authController')

app.use(express.json())
app.use(cors())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('DATABASE CONNECTED')
    app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`))
});

// Puzzle Endpoints

app.get(`/api/puzzles:diff`, puzzCtrl.getGrid);

// Auth Endpoints

app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/logout', authCtrl.logout);