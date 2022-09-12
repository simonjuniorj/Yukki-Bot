const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-welcome",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to execute this command!")
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please provide correct to use as welcome channel")
        message.channel.send(`successfully set the welcome channel to ${channel}`)
        db.set(`welcomeChannel_${message.guild.id}`, channel.id)
    }
}