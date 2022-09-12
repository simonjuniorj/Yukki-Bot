const Discord = require('discord.js')
const superagent = require('snekfetch')
const prefix = require('../../config.json');

module.exports = {name: "cat",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
        superagent.get('https://nekos.life/api/v2/img/meow')
           .end((err, response) => {
            const lewdembed = new Discord.MessageEmbed()
              .setTitle("Random cat")
              .setImage(response.body.url)
              .setColor(`#000000`)
              .setFooter(`OwO | ${message.author.tag}`)
              .setTimestamp()
              .setURL(response.body.url);
            message.channel.send(lewdembed); 
           })
    }
}