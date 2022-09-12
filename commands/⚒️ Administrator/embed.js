const discord = require('discord.js')
const db = require('quick.db')
const prefix = require('../../config.json');

module.exports = {name: "embed",category: "admin",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: (client, message, args) => {
        let prefix;
        let prefixes = db.fetch(`prefix_${message.guild.id}`)
        if (prefixes == null) {prefix = "="} else {prefix = prefixes}
        if(!args[0]) return message.reply(`:x: Wyglada na to, ze zostala wykonana komenda lecz bez argumentow. \n Muj prefix to \`${prefix}\`, lecz poprawne uzycie to \`${prefix}embed <info/edit/lista/usun/stworz> <arg>\``)
    }
}