const Channel = require('../schema/channels');

exports.addChannel = (channel) =>{
    const record = {
        channelId: channel.id,
        channelName: channel.name
    }
    const newChannel = new Channel(record);
    newChannel.save();
}

exports.deleteChannel = () => {

}

exports.getAllChannels = async () => {
    return await Channel.find();
}