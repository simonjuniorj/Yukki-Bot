const discord = require('discord.js')
const db = require('quick.db')
const prefix = require('../../config.json');

module.exports = {name: "set-welcome-message",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: (client, message, args) => {
        message.delete()
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to execute this command!")
        if(!args) return message.channel.send(":x: No args provided")
        message.channel.send(`successfully set the welcome message to ${args.join(' ')}`)
        db.set(`welcomeMessage_${message.guild.id}`, args.join(' '))
    }
}