const { CategoryChannel } = require('discord.js');
const Channel = require('../schema/channels');

exports.addChannel = (channel) =>{
    const record = {
        channelId: channel.id,
        channelName: channel.name
    }
    const newChannel = new Channel(record);
    newChannel.save();
}

exports.deleteChannel = async (id) => {
    
    try {
        await Channel.findOneAndRemove({channelId: id});
        return true;
    } catch(e) {
        return false;
    }
    
}

exports.getAllChannels = async () => {
    return await Channel.find();
}