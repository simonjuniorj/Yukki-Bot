const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-welcome-status",category: "admin",description: "Sends detailed info about the client",usage: "set-welcome-status <yes/no / true/false / on/off>",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to execute this command!")
        if(!args[0]) return message.reply(`:x: One or more argument are missing, Usage: \`!set-welcome-status <on/off>\``)
        const welcomestatusstatus = db.fetch(`welcomeStatus_${message.guild.id}`)
        if(args[0] == "msg") {
            if (welcomestatusstatus == "msg") {
                message.reply(`:x: Levels type are already msg`)
            } else {
                message.channel.send(`:white_check_mark: Welcome settings are currently enabled`)
                db.set(`welcomeStatus_${message.guild.id}`, "on")
            }
        } else if (args[0] == "off") {
            if (welcomestatusstatus == "off") {
                message.reply(`:x: Welcome settings are already disabled`)
            } else {
                message.channel.send(`:white_check_mark: welcome settings are currently disabled`)
                db.set(`welcomeStatus_${message.guild.id}`, "off")
            }
        }
    }
}