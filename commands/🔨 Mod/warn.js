const db = require("quick.db");

module.exports = {name: "warn",category: "mod",description: "warns member for an reason",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return 
        const user = message.mentions.members.first()
        if(!user) return message.reply(":x: Please mention a person to who you wanna to warn - warn @mention <reason>")
        if(message.mentions.users.first().bot) return message.reply(":x: `Nie mozesz dac warna botom`")
        if(message.author.id === user.id) return message.reply(":x: `Nie mozesz dac warna samemu sobie`")
        const reason = args.slice(1).join(" ");
        if(!reason) return message.reply(":x: `Prosze podaj powod do warna = warn @osoba <powod>`")
        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`Dostales ostrzezenie na **${message.guild.name}** od *${message.author.username}* za ${reason}`)
        await message.channel.send(`Pomyslnie ostrzegles **${message.mentions.users.first().username}** za ${reason}`)
        message.delete(5000)
    }
}