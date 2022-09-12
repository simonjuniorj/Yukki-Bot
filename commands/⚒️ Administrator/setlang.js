const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-lang",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have enough permission to execute this command!")
        const lang = args[0];
        if(!lang) return message.channel.send("Please specify a correct language")
        await db.set(`lang_${message.guild.id}`, lang)
        message.channel.send(`successfully set the log channel to ${lang}`)
    }
}