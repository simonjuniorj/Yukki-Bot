const Discord = require('discord.js')
const db = require("quick.db");
const ms = require("ms");
const prefix = require('../../config.json');

module.exports = {name: "daily",aliases: ["DAILY", "Daily"],category: "ekonomia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = random(10,1500);

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let timeEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:x: You've already collected your daily reward. Try again later!`);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: You've collected your daily reward of ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
        } 
    }
}