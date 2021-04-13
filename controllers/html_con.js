const fetch = require('node-fetch')
const atob = require('atob');
const blotify = require('../config/blotify');
const db = require('../models');
const spotifyAPI = require('../config/config')();

module.exports = (app) => {
    app.get('/', (request, response) => {
        response.render('login', {})
    });

    app.get('/authorize', (request, response) => {
        response.redirect(spotifyAPI.createAuthorizeURL(blotify.spotify.scopes))
        // response.redirect(`https://accounts.spotify.com/authorize?client_id=${atob(process.env.CLIENT_ID)}&response_type=code&redirect_uri=${process.env.REDIRECT_TOKEN}&scope=${process.env.SCOPE}&state=${process.env.STATE}`)
    });

    // app.get('/home', async (request, response) => {
    //     const user = await db.User.findOne({
    //         name: "Current User"
    //     });

    //     // curl -H "Authorization: Bearer NgCXRK...MzYjw" https://api.spotify.com/v1/me
    //     const userData = await fetch('https://api.spotify.com/v1/me', {
    //         header: {
    //             "Authorization": `Bearer ${user.Spotify_info.access_token}`
    //         }
    //     })

    //     response.json(userData);
    // })
}