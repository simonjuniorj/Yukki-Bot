const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "set-verify-channel",category: "admin",description: "Ustawia kanał do weryfikacji",usage: "<kanal>",arguments: "kanal",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: `Nie posiadasz odpowiednich uprawnien do uzycia tej komendy`!")
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(":x: `Prosze oznaczyc # jaki kanał ma byc do weryfikacji`")
        if(channel.type == "voice") return message.channel.send(":x: `Kanal do weryfikacji nie moze byc typu:` voice")
        message.channel.send(`:white_check_mark: Ustawiono pomyslnie kanal \`${channel.name}\` do weryfikacji`)
        db.set(`verifyChannel_${message.guild.id}`, channel.id)
    }
}