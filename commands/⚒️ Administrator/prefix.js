const discord = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require("../../config.json")

module.exports = {name: "set-prefix",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":x: `Nie posiadasz odpowiednich uprawnien do u�ycia tej komendy`")
        if(!args[0]) return message.reply(":x: `Podaj prefix, kt�ry chcesz ustawi�`")
        if(args[1]) return message.reply(":x: `Nie mo�esz ustawi� prefiksu z podw�jnym argumentem`")
        if(args.length > 3) return message.reply(":x: `Nie mo�esz ustawic prefiksu, min 3 znaki`")
        if(args[0] == "/") return message.reply(":x: `Nie mozesz uzyc prefiksu, z uzyciem aplikacji`")
        if(args[0] == "none") {
            db.delete(`prefix_${message.guild.id}`)
            return await message.reply("`Prefix zosta� zresetowany pomy�lnie` :white_check_mark:")
        }
        db.set(`prefix_${message.guild.id}`, args[0])
        return await message.reply(":white_check_mark: `Ustawiono pomy�lnie nowy prefix na`" + ` *${args[0]}*`)
    }
}