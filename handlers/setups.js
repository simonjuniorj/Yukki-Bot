const Discord = require("discord.js")
const db = require('quick.db');
const config = require("../config.json")
console.log("£adowanie ustawieÒ...")
module.exports = (client) => {
    client.on("guildCreate", guild => {
        client.settings.delete(guild.id, "prefix");
        client.settings.ensure(guild.id, {prefix: config.prefix,});
        getAll(client, guild)
    }) 
    client.on('ready', () => {
        console.log(`Zalogowa≥em sie`)
    })
    client.on('message', message => {
    xp(message)
    if(message.author.bot) return;
  
    function xp(message) {
      if(message.author.bot) return;
      const randomNumber = Math.floor(Math.random() * 50) + 100;
      db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
      db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
      const levelchannel = db.fetch(`levelChannel_${message.guild.id}`)
      const levelmessage = db.fetch(`levelMessage_${message.guild.id}`)
      const leveltype = db.fetch(`levelType_${message.guild.id}`)
      var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
      var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
      var xpNeeded = level * 500;
      if (xpNeeded < xp){
        var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
        db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
        const embednewlvl = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${levelmessage || levelmessage == `Gratki ${message.author.username}, za zdobycie ${newLevel} poziomu! GG!`}`)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        if(leveltype == "msg") {client.channels.cache.get(levelchannel).send(levelmessage)} else if (leveltype == "embed") {client.channels.cache.get(levelchannel).send(embednewlvl)} else if(!leveltype) return;
      }
    }

    })
    const {MessageEmbed} = require("discord.js");
    const {stripIndents} = require("common-tags");
    function getAll(client, guild) {
        const embed = new MessageEmbed().setColor(config.colors.yes).setAuthor('Hii - THANKS FOR INVITING ME!').addField("I was made for help people with my fancy functions. Im glad to my creator", `>>> <@414142733234601984> \`Simonjunior006#0001\` \n You can also invite me to your server by clicking [\`INVITE\`](https://discord.com/api/oauth2/authorize?client_id=855125526694723614&permissions=2184527168&scope=bot%20applications.commands) I will be very happyful if u do this`).setFooter("To see what i can actually do   s2?help [CMD Name]", client.user.displayAvatarURL())
        const commands = (category) => {return client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(", ");}
        const info = client.categories.map(cat => stripIndents `**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`).reduce((string, category) => string + "\n\n" + category);
        const channel = guild.channels.cache.find(channel =>channel.type === "text" &&channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
        return channel.send(embed.setDescription(`*use the Prefix **\`${config.prefix}\`** infront of EACH command, to use it correctly!*\n` + info));
    }
    client.on('voiceStateUpdate', (oldState, newState) => {if (newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false) {try {const channel = newState.member.guild.channels.cache.find(channel =>channel.type === "text" &&(channel.name.includes("cmd") || channel.name.includes("command") || channel.name.includes("bot")) &&channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES"));channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience");newState.setDeaf(true);} catch (error) {try {const channel = newState.member.guild.channels.cache.find(channel =>channel.type === "text" &&channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES"));channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience");newState.setDeaf(true);} catch (error) {newState.setDeaf(true);}}}});
    console.log("Ustawienia zosta≈Çy za≈Çadowane")
}