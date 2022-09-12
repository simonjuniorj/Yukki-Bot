const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-levels-channel",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: `You dont have enough permission to execute this command!`")
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(":x: `Please provide correct to use as levels channel`")
        message.channel.send(":white_check_mark: `Successfully set the levels channel to `" + `${channel}`)
        db.set(`levelChannel_${message.guild.id}`, channel.id)
    }
}