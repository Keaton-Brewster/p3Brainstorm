const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const blotify = require('./blotify');

passport.use(new SpotifyStrategy({
        clientID: blotify.spotify.client_id,
        clientSecret: blotify.spotify.client_secret,
        callbackURL: 'http://localhost:/auth/for_token',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({
            spotifyId: profile.id
        }, function (err, user) {
            return done(err, user);
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;