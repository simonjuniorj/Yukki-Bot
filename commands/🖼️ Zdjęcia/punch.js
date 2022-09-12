const discord = require('discord.js')
const fetch = require('node-fetch')
const { Random } = require("something-random-on-discord");
const prefix = require('../../config.json');

module.exports = {name: "punch",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
    
      let target = message.mentions.members.first()
    
      let data = await Random.getAnimeImgURL("punch");
    
      let embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor("RANDOM")
      .setFooter(`${message.author.username} punches ${target.user.username}! Adorable :o`)
      .setTimestamp()
    
      message.channel.send(embed);   
    }
}