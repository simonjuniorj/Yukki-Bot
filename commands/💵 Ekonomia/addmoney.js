const Discord = require('discord.js')
const db = require("quick.db");
const prefix = require('../../config.json');

module.exports = {name: "add-money",aliases: ["Add-money", "Add-Money", "ADD-MONEY"],category: "ekonomia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: `You Do Not Have Permissions To Add Money! - [ADMINISTRATOR]`");
        if (!args[0]) return message.channel.send(":x: `Please Enter A User!`")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send(":x: `Enter A Valid User!`")
        if (!args[1]) return message.channel.send(":x: `Please Enter A Amount!`")
        if (isNaN(args[1])) return message.channel.send(":x: `Your Amount Is Not A Number!`");
        if (args[0] > 10000) return message.channel.send(":x: `Cannot Add That Much Amount!`")
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

        let moneyEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`:heavy_check_mark: Added ${args[1]} coins\n\nNew Balance: ${bal}`);
        message.channel.send(moneyEmbed) 
    }
}