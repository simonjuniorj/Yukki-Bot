const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-channel-log-status",category: "admin",description: "Sends detailed info about the client",usage: "set-channel-log-status <yes/no / true/false / on/off>",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: You don't have enough permission to execute this command!")
        if(!args[0]) return message.reply(`:x: One or more argument are missing, Usage: \`!set-welcome-status <on/off>\``)
        const status = db.fetch(`channellogStatus_${message.guild.id}`)
        if(args[0] == "on") {
            if (status == "on") {
                message.reply(":x: `Channels logging are already enabled`")
            } else {
                message.channel.send(":white_check_mark: `Channels logging are currently disabled`")
                db.set(`channellogStatus_${message.guild.id}`, "on")
            }
        } else if (args[0] == "off") {
            if (status == "off") {
                message.reply(":x: `Channels logging are already disabled`")
            } else{
                message.channel.send(":white_check_mark: `Channels logging are currently disabled`")
                db.set(`channellogStatus_${message.guild.id}`, "off")
            }
        }
    }
}