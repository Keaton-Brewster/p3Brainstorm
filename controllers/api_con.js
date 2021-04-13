const axios = require('axios').default;
const fetch = require('node-fetch');
const btoa = require('btoa');
const blotify = require('../config/blotify');
const spotifyAPI = require('../config/config')();
const db = require('../models');

const buffer = (string) => {
    return Buffer.from(string).toString('base64');
}

module.exports = (app) => {
    app.get('/api/redeem_access_key', ({
        body
    }, response) => {
        console.log(body);
        response.end();
    })

    app.get('/auth/for_token', async (request, response) => {
        if (request.query.error) return console.error(request.query.error);
        const code = request.query.code;
        let userData;
        let user = await db.User.findOne({
            name: "Current User"
        });

        await spotifyAPI.authorizationCodeGrant(code)
            .then(async data => {
                const access_token = data.body.access_token;
                const refresh_token = data.body.refresh_token;

                spotifyAPI.setAccessToken(access_token);
                spotifyAPI.setRefreshToken(refresh_token);


                await user.setSpotifyInformation(data.body);
                await user.save();

                userData = await spotifyAPI.getMe();
                userData = userData.body;
            })

        // response.json(userData);
        console.log(user);
        response.render('home', userData);


        // client_id = process.env.CLIENT_ID;
        // client_secret = process.env.CLIENT_SECRET;
        // let query = 'https://accounts.spotify.com/api/token';
        // query += '&code=' + request.query.code;
        // query += '&redirect_uri=' + process.env.REDIRECT_TOKEN;
        // //!============================================================================

        // const accessToken = await fetch(query, {
        //     headers: {
        //         'Content-Type':'application/x-www-form-urlencoded',
        //         'Authorization': `Basic ${blotify.spotify.base64_combo}`
        //     }
        // })
        // console.log(accessToken);
        // response.end();


        //!============================================================================
        //* Request constructor doesn't work
        // const options = {
        //     client_id: client_id,
        //     client_secret: client_secret,
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     grant_type: 'authorization_code',
        //     code: request.query.code,
        //     redirect_uri: process.env.REDIRECT_TOKEN
        // };
        // const newRequest = new Request('https://accounts.spotify.com/api/token', options);


        // await fetch(newRequest)
        //     .then(res => console.log(res))
        //     .catch(err => console.error(err));
        //!============================================================================
        //* This is just console logging for learning
        // console.log(client_id, client_secret);
        // console.log(`query code = ${request.query.code}`);
        // console.log(`redirect uri = ${process.env.REDIRECT_TOKEN}`);
        // console.log(`${btoa(client_id)}:${btoa(client_secret)}`);
        //!============================================================================
        //* cannot get normal api stuff to work what the hell

        // await fetch('https://accounts.spotify.com/api/token', {
        //         method: 'POST',
        //         body: {
        //             client_id: client_id,
        //             client_secret: client_secret,
        //             code: request.query.code,
        //             grant_type: 'authorization_code',
        //             redirect_uri: process.env.REDIRECT_TOKEN,
        //         },
        //         headers: {
        //             'Authorization': `Basic ${blotify.spotify.base64_combo}`,
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     }).then(res => console.log(res))
        //     .catch(err => console.error(err.error));
        // response.json(userStuff) 
        // console.log(userStuff);
        //!==========================================================================
    })

    app.post('/api/last_fm/tokens', (request, response) => {
        response.end();
    })
}