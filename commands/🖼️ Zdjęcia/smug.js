const discord = require('discord.js')
const fetch = require('node-fetch')
const { Random } = require("something-random-on-discord");
const prefix = require('../../config.json');

module.exports = {name: "smug",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {

      let target = message.mentions.members.first()
    
      let data = await Random.getAnimeImgURL("smug");
    
      let embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor("RANDOM")
      .setTimestamp()

      if(!target) {
          embed.setFooter(`${message.author.username} has a smug look.`)
      } else {
          embed.setFooter(`${message.author.username} has a smug look on ${target.user.username}`)
      }
    
      message.channel.send(embed);   
    }
}