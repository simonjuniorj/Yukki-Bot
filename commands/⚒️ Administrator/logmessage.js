const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-message-status",category: "admin",description: "Sends detailed info about the client",usage: "set-message-status <yes/no / true/false / on/off>",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: You don't have enough permission to execute this command!")
        if(!args[0]) return message.reply(`:x: One or more argument are missing, Usage: \`!set-welcome-status <on/off>\``)
        const status = db.fetch(`messagelogStatus_${message.guild.id}`)
        if(args[0] == "on") {
            if (status == "on" || "yes" || "true") {return message.reply(":x: `Message logging are already enabled`")
            } else {
                message.channel.send(":white_check_mark: `Message logging are currently disabled`")
                db.set(`messagelogStatus_${message.guild.id}`, "on")
            }
        } else if (args[0] == "off") {
            if (status == "off" || "no" || "false") {return message.reply(":x: `Message logging are already disabled`")
            } else{
                message.channel.send(":white_check_mark: `Message logging are currently disabled`")
                db.set(`messagelogStatus_${message.guild.id}`, "off")
            }
        }
    }
}