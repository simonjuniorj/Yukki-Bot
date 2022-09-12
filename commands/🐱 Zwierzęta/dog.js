const Discord = require('discord.js')
const superagent = require('snekfetch')
const prefix = require('../../config.json');

module.exports = {name: "dog",aliases: "DOG",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
        superagent.get('https://nekos.life/api/v2/img/woof')
           .end((err, response) => {
        const lewdembed = new Discord.MessageEmbed()
           .setTitle("Random dog")
           .setImage(response.body.url)
           .setColor(`#000000`)
           .setFooter(`WHAT A DOG | ${message.author.tag}`)
           .setTimestamp()
           .setURL(response.body.url);
        message.channel.send(lewdembed); 
        })
    }
}