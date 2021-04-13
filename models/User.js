const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "Spotify_info": Object
});

UserSchema.methods.setSpotifyInformation = function (object = {}) {
    this.Spotify_info = object;
    return this.Spotify_info;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;