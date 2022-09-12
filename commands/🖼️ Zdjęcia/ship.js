const discord = require('discord.js')
const fetch = require('node-fetch')
const prefix = require('../../config.json');

module.exports = {name: "ship",category: "zdjecia",description: "Sends detailed info about the client",usage: "[command]",arguments: "info/edit/lista/usun/stworz",
    run: async (client, message, args) => {
	      let user =  await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let user2 =  await message.mentions.members.array()[1] || message.guild.members.cache.get(args[1])
	      if(!args[0]) return message.channel.send("**Enter Name Of Lover!**")
        if(!args[1]) return message.channel.send("**Enter Name Of Another Lover!**")

        if (!user) return message.channel.send("**Please Enter A Valid User!**")
        if (!user2) return message.channel.send("**Please Enter A Valid User!**")

        let m = await message.channel.send("**Please Wait..**");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${user.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${user2.user.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "love.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch(e){
            m.edit("Error, Please Try Again! Mention Someone");
        }    
    }
}