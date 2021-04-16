const blotify = require('./blotify');
const SpotifyAPI = require('spotify-web-api-node');
const spotifyApi = new SpotifyAPI({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_TOKEN,
});

//! Changed the way this module.export works, so yea going to want to make sure that it works before commiting this
module.exports = () => {
    try {
        return spotifyApi
    } catch (e) {
        throw new Error(e);
    }
}