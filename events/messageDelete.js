var discord = require('discord.js')
var client = new discord.Client();
var db = require('quick.db')

//logging
//message purge
client.on('messageDelete', async message => {
    console.log(message.id)
    var embed = new discord.RichEmbed()
    .setColor("#6600ff")
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${message.author.tag} message was deleted in ${Message.channel}`)
    .addField("**Content**", `➔ ${message.content}`)
    .addField("**Author**", `➔ ${message.author.tag}`)
    .addField("**ID**", "```" + `User: ${message.author.id}` + `Message: ${message.id}` + "```")
    .setTimestamp()
    if (message.guild) {
        var embed = new discord.RichEmbed()
        .setColor("#6600ff")
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${message.author.tag} message was deleted in ${Message.channel}`)
        .addField("**Content**", `➔ ${message.content}`)
        .addField("**Author**", `➔ ${message.author.tag}`)
        .addField("**ID**", "```" + `User: ${message.author.id}` + `Message: ${message.id}` + "```")
        .setTimestamp()
        console.log(message.id)
        let channel = message.guild.channels.cache.find(ch=>ch.id===868242485095325746)
        if(!channel) return;
        channel.send(embed)
    }
})