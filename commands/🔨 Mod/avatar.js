const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "avatar",category: "mod",description: "Sends detailed info about the client",usage: "[command]",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: You don't have enough permission to execute this command!")
        let mem = message.mentions.members.first()
        if(!mem) return message.reply(":x: Please provide correct user by \`@\`")
        const embed = new discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(`${mem.user.tag}'s Avatar`)
        .setImage(mem.user.displayAvatarURL({dynamic: true, format: 'png'}))
        message.channel.send(embed)
    }
}