const db = require('quick.db')
module.exports = {name: "set-log-farewell",category: "admin",description: "Sends detailed info about the client",usage: "set-log-member",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to execute this command!")
        if(!args[0]) return message.reply(`:x: One or more argument are missing, Usage: \`!set-log-farewell <on/off>\``)
        const welcomestatusstatus = db.fetch(`logfarewell_${message.guild.id}`)
        if(args[0] == "on") {
            if (welcomestatusstatus == "on") {
                message.reply(`:x: Farewell log are already enabled`)
            } else {
                message.channel.send(`:white_check_mark: Farewell log are currently enabled`)
                db.set(`logfarewell_${message.guild.id}`, "on")
            }
        } else if (args[0] == "off") {
            if (welcomestatusstatus == "off") {
                message.reply(`:x: Farewell log are already disabled`)
            } else {
                message.channel.send(`:white_check_mark: Farewell log are currently disabled`)
                db.set(`logfarewell_${message.guild.id}`, "off")
            }
        }
    }
}