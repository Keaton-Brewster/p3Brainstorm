const blotify = require('./blotify');
const SpotifyAPI = require('spotify-web-api-node');

module.exports = () => {
    return new SpotifyAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_TOKEN,
    })
}