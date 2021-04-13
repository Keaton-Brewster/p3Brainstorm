require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const blotify = require('./config/blotify');
const compression = require('compression');
const db = require('./models');
const mongoose = require('mongoose');

// const passport = require('./config/passport.js');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(compression());
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'blotify_sessions',
    resave: true,
    saveUninitialized: true
}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blotifydb', {
    useNewUrlParser: true,
});


// app.use(passport.initialize());
// app.use(passport.session());

//set up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
require('./controllers/api_con')(app);
require('./controllers/html_con')(app);


try {
    app.listen(PORT, async () => {
        console.log(`Listening on port ${PORT}.`);
        db.User.create({
            name: 'Current User'
        });
    });
} catch (err) {
    console.error(`Error at app.js(53): ${err}`);
}