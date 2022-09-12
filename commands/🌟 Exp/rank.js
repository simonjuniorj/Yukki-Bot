const discord = require('discord.js')
const db = require('quick.db')

module.exports = {name: "rank",category: "Exp",description: "Ustawia kana³ do weryfikacji",usage: "<kanal>",arguments: "kanal",
    run: async (client, message, args) => {
        var user = message.mentions.users.first() || message.author;
        var level = await db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
        var currentxp = await db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
        var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
        var xpLeft = xpNeeded - currentxp;
        const embedlvl = new discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(":sparkles: `EXP:` " + currentxp + "/" + xpNeeded + `\n` + ":bar_chart: `Poziom:` " + level + `\n` + ":up: `Nast. Poziom:` " + xpNeeded + ` (${xpLeft} do ${level} poziomu)`)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
	.setTimestamp()
	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embedlvl)
    }
}