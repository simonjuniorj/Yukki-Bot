const discord = require('discord.js')
const fetch = require('node-fetch')
const { Random } = require("something-random-on-discord");
const prefix = require('../../config.json');

module.exports = {name: "cry",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
    
      let data = await Random.getAnimeImgURL("cry");
    
      let embed = new discord.MessageEmbed()
      .setImage(data)
      .setColor("RANDOM")
      .setFooter(`${message.author.username} crying. Need an hug`)
      .setTimestamp()
    
      message.channel.send(embed);   
    }
}