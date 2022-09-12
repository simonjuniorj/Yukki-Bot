const Discord = require('discord.js')
const db = require("quick.db");
const prefix = require('../../config.json');

module.exports = {name: "balance",aliases: ["bal", "money", "cash"],category: "ekonomia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${message.guild.id}_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);

    if (bank === null) bank = 0;
let Total = bal + bank
    if (user) {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${user.user.username}'s Balance`, user.user.displayAvatarURL({dynamic: true}))
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**Cash:** ${bal}$\n**Bank:** ${bank}$\n**Total:** ${Total}$`)
        .setTimestamp()
      message.channel.send(moneyEmbed);
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }    
}
}