const discord = require('discord.js')
const moment = require('moment')

module.exports = {name: "kick",category: "mod",description: "Kicks member for an reason",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return 
        const member = message.mentions.members.first()
        if(!member) return message.reply(":x: Please mention a member which you wanna to kick!")
        if(member.id == message.author.id) return message.reply(":x: You cannot kick yourself :c")
        if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply(":x: You cannot punish this member, because u either have the same role or your role is lower")
        const reason = args.slice(1).join(" ") || "Brak";
        const embed = new discord.MessageEmbed()
        .setColor("#ff000d")
        .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${member} was kicked`)
        .addField("**Information**", `➔ ${member.user.tag} (${member.user.id}) ${member}`)
        .addField("**Joined At**", `➔ ` + moment(member.user.joinedTimestamp).format("D/M/YYYY on h:mm") + " " + moment(member.user.joinedTimestamp).fromNow())
        .addField("**Created At**", `➔ ` + moment(member.user.createdTimestamp).format("DD/MM/YYYY on h:m:s") + " " + moment(member.user.createdTimestamp).fromNow())
        .addField("**ID**", "```" + `User: ${member.user.id}` + "```")
        .setTimestamp()
        await member.kick({ reason })
        message.channel.send(`:yes~1: Pomyslnie wyrzucono :boot: ${member} for \`${reason}\``)
    }
}