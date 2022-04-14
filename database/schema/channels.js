const moongose = require('mongoose');

const Schema = moongose.Schema;

const discordChannelsSchema = new Schema({
    channelId: {
        type: String,
        require: true,
    },
    channelName: {
        type: String,
        require: true
    }
});

module.exports = moongose.model('discordChannels',discordChannelsSchema);