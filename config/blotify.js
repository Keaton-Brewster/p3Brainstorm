const btoa = require('btoa');

module.exports = {
    spotify: {
        client_id: "70d3be70a7624fe38bd3d8da864c93c0",
        client_secret: "6519afda53c043459d63860afde391de",
        base64_combo: 'NzBkM2JlNzBhNzYyNGZlMzhiZDNkOGRhODY0YzkzYzA=:NjUxOWFmZGE1M2MwNDM0NTlkNjM4NjBhZmRlMzkxZGU=',
        redirect_home: "http://localhost:8080/home",
        redirect_auth: "http://localhost:8080/auth",
        redirect_token: 'http://localhost:8080/auth/for_token',
        redirect_token_hash: encodeURI(this.redirect_token),
        scopes: [
            "user-read-private",
            "user-read-email",
            "user-read-recently-played",
            "user-read-playback-state", "user-top-read",
            "user-read-currently-playing",
            "user-library-read"
        ],
        state: btoa("Blotify2021")
    },
    last_fm: {
        api_key: "501dcb1b4935733b50ca2e80ce5b2006",
        secret: "e19935a84a447b734a115c80ac6b1f0e"
    },
    goLive: function () {
        process.env.CLIENT_ID = btoa(this.spotify.client_id);
        process.env.CLIENT_SECRET = btoa(this.spotify.client_secret);
        process.env.REDIRECT_TOKEN = encodeURI(this.spotify.redirect_token);
        process.env.SCOPE = this.spotify.scopes.join()
        process.env.STATE = this.spotify.state;
    }
}