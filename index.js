const Discord = require("discord.js")
const { CHANNEL_ID, SERVER_ID, YT_LINK } = require("./config.json")
const {Collection} = require("discord.js")
const intents = ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"];
const client = new Discord.Client({fetchAllMembers: false,restTimeOffset: 0,shards: "auto",disableEveryone: true,intents: intents, ws:{intents: intents}})
const translate = require('@iamtraction/google-translate');
const { GiveawaysManager } = require('discord-giveaways');
const fs = require('fs')
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/')
client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;
["command"].forEach(handler => {require(`./handlers/${handler}`)(client);});
require("./handlers/slashcommands")(client);
require("./handlers/setups")(client)
const Enmap = require("enmap");
client.settings = new Enmap({name: "settings",dataDir: "./databases/settings"});
const moment = require('moment');
const db = require('quick.db');
const default_prefix = require('./config.json')
client.on("message", async (message, guild) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix;
  let prefixes = await db.fetch(`prefix2_${message.guild.id}`)
  if (prefixes == null) {prefix = "="} else {prefix = prefixes}
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1)
  let commands = client.commands.get(cmd.slice(prefix.length));
  if(commands) return commands.run(client, message, args, prefix);
})

//message Update
client.on("messageUpdate", async (message,oldMessage, newMessage) => {
    if (message.author.bot) return;
    if (!oldMessage.author) return;
    const messagestatus = db.fetch(`messagelogStatus_${message.guild.id}`)
    const logchannel = db.fetch(`loggingChannel_${message.guild.id}`)
    if(!logchannel) return
    var newMessage = await message.content
    var embed = new Discord.MessageEmbed()
    .setColor("#6600ff")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`${message.author.toString()} message was edited in ${message.channel} \n `)
    .addField("**Before**", `${newMessage}`)
    .addField("**After**", `${oldMessage.content}`)
    .addField("**Author**", `${message.author.tag}`)
    .addField("**At**", new Date())
    .addField("**ID**", "```" + `User: ${message.author.id}` + `\nMessage: ${message.id}` + `\nChannel: ${message.channel.id}`+ "```")
    .setTimestamp()
    console.log(`(${message.guild.id})[MSGCH] ${message.author.tag} message was edited from ${newMessage} to ${oldMessage.content} at ${message.guild.name} in ${message.channel.name}`)
    client.channels.cache.get(logchannel).send(embed)
})

client.on('guildMemberAdd', async (member) => {
  const channel = db.fetch(`loggingChannel_${member.guild.id}`)
  const welmessage = db.fetch(`welcomeMessage_${member.guild.id}`)
  const welchannel = db.fetch(`welcomeChannel_${member.guild.id}`)
  const welstatus = db.fetch(`welcomeStatus_${member.guild.id}`)
  const wellog = db.fetch(`logWelcome_${member.guild.id}`)
if(!channel) return
var embed = new Discord.MessageEmbed()
.setColor("#21fc0d")
.setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
.setDescription(`${member} was joined`)
.addField("**Information**", `${member.user.tag} (${member.user.id}) ${member}`)
.addField("**Joined At**", moment(member.user.joinedTimestamp).format("D/M/YYYY on h:mm") + " " + moment(member.user.joinedTimestamp).fromNow())
.addField("**Created At**", moment(member.user.createdTimestamp).format("DD/MM/YYYY on h:m:s") + " " + moment(member.user.createdTimestamp).fromNow())
.addField("**ID**", "```" + `User: ${member.user.id}` + "```")
.setTimestamp()
client.channels.cache.get(channel).send(embed)
  if (welstatus == "on") {
    client.channels.cache.get(welchannel).send(welmessage.replace('<@>', `<@${member.id}>`))
  } else if (welstatus == "off") return
})

client.on('guildMemberRemove', async (member) => {
const channel = db.fetch(`loggingChannel_${member.guild.id}`)
const farewellmessage = db.fetch(`farewellMessage_${member.guild.id}`)
const farewellchannel = db.fetch(`farewellChannel_${member.guild.id}`)
const farewellstatus = db.fetch(`farewellStatus_${member.guild.id}`)
const farewelllog = db.fetch(`logfarewell_${member.guild.id}`)
if(!channel) return
var embed = new Discord.MessageEmbed()
.setColor("#ff000d")
.setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
.setDescription(`${member} was left`)
.addField("**Information**", `${member.user.tag} (${member.user.id}) ${member}`)
.addField("**Joined At**", moment(member.user.joinedTimestamp).format("D/M/YYYY on h:mm") + " " + moment(member.user.joinedTimestamp).from(member.user.joinedTimestamp))
.addField("**Created At**", moment(member.user.createdTimestamp).format("DD/MM/YYYY on h:m:s") + " " + moment(member.user.createdTimestamp).fromNow())
.addField("**ID**", "```" + `User: ${member.user.id}` + "```")
.setTimestamp()
client.channels.cache.get(channel).send(embed)

if(farewellstatus == "on") {
  client.channels.cache.get(farewellchannel).send(farewellmessage.replace('<@>', `<@${member.id}>`))
} else if (farewellstatus == "off") return
})

client.on('guildBanAdd', async (ban) => {
const fetchedLogs = await ban.guild.fetchAuditLogs({
	limit: 1,
	type: 'MEMBER_BAN_ADD',
});
const banLog = fetchedLogs.entries.first();
const { executor, target, reason } = banLog;
const channel = db.fetch(`loggingChannel_${member.guild.id}`)
var logembed = new Discord.MessageEmbed()
.setColor("LIGHT CORAL")
.setAuthor(executor.tag, executor.displayAvatarURL({dynamic: true}))
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
.setDescription(`${target} was banned`)
.addField("**Name**", `${target.tag} (${target.id}) ${target}`)
.addField("**Joined At**", + moment(target.joinedTimestamp).format("D/M/YYYY on h:m:s") + " " + moment(target.joinedTimestamp))
.addField("**Created At**", + moment(target.createdTimestamp).format("DD/MM/YYYY on h:m:s") + " " + moment(target.createdTimestamp).fromNow())
.addField("**Reason**", `${reason || "None"}`)
.addField("**Responsible Moderator**", `${executor.tag} (${executor.id}) ${executor}`)
.addField("**ID**", "```" + `User ➔ ${target.id} \n Executor ➔ ${executor.id}` + "```")
.setTimestamp()
client.channels.cache.get(channel).send(logembed)
})

client.on('guildBanRemove', async (ban) => {
const fetchedLogs = await ban.guild.fetchAuditLogs({
	limit: 1,
	type: 'MEMBER_BAN_ADD',
});
const banLog = fetchedLogs.entries.first()
const { executor, target, reason } = banLog;
const channel = db.fetch(`loggingChannel_${member.guild.id}`)
var logembed = new Discord.MessageEmbed()
.setColor("CHOCOLATE")
.setAuthor(executor.username, executor.displayAvatarURL({dynamic: true}))
.setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
.setDescription(`${target} was unbanned`)
.addField("**Name**", `${target.tag} (${target.id}) ${target}`)
.addField("**Created At**", + moment(target.createdTimestamp).format("DD/MM/YYYY on h:m:s") + " " + moment(target.createdTimestamp).fromNow())
.addField("**Reason**", `${reason || "None"}`)
.addField("**Responsible Moderator**", `${executor.tag} (${executor.id}) ${executor}`)
.addField("**ID**", "```" + `User ➔ ${target.id} \n Executor ➔ ${executor.id}` + "```")
.setTimestamp()
client.channels.cache.get(channel).send(logembed)
})

client.on('userUpdate', async (oldMember, newMember) => {
  const txtchannel = db.fetch(`loggingChannel_${oldMember.guild.id}`)
  const embed = new Discord.MessageEmbed()
  .setColor("GRAY")
  .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL({dynamic: true}))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`${newMember.user.tag} ${newMember} was updated`)
  .setTimestamp()
  if (oldMember.discriminator !== newMember.discriminator){
    embed.addField("Tag", `Now > ${newMember.discriminator} \n Was > ${oldMember.discriminator}`)
  }
  client.channels.cache.get(txtchannel).send(embed)
})

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const txtchannel = db.fetch(`loggingChannel_${oldMember.guild.id}`)
  let oldRoleIDs = [];
  oldMember.roles.cache.each(role => {oldRoleIDs.push(role.id);});
  let newRoleIDs = [];
  newMember.roles.cache.each(role => {newRoleIDs.push(role.id);});
  if (newRoleIDs.length > oldRoleIDs.length) {
      function filterOutOld(id) {
          for (var i = 0; i < oldRoleIDs.length; i++) {
              if (id === oldRoleIDs[i]) {
                  return false;
              }
          }
          return true;
      }
      let onlyRole = newRoleIDs.filter(filterOutOld);

      let IDNum = onlyRole[0];
      let icon = newMember.user.avatarURL();
      
      const newRoleAdded = new Discord.MessageEmbed()
        .setColor("GREEN")
    	.setAuthor(newMember.user.tag, icon)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${newMember.user.tag} ${newMember} was updated:`)
        .addField("Changes", `:heavy_plus_sign: <@&${IDNum}>`)
        .addField("IDs", "```" + `User ➔ ${newMember.user.id} \nRole ➔ ${IDNum}` + "```")
        .setTimestamp()
  
    client.channels.cache.get(txtchannel).send(newRoleAdded)
  } else if (newRoleIDs.length < oldRoleIDs.length) {
    function filterOutNew(id) {
      for (var i = 0; i < newRoleIDs.length; i++) {
          if (id === newRoleIDs[i]) {
              return false;
          }
      }
      return true;
    }
    let onlyRole = oldRoleIDs.filter(filterOutNew)

    let IDNum = onlyRole[0]
    let icon = newMember.user.avatarURL({ dynamic: true })

    const RoleRemoved = new Discord.MessageEmbed()
        .setColor("RED")
    	.setAuthor(newMember.user.tag, icon)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${newMember.user.tag} ${newMember} was updated:`)
        .addField("Changes", `:x: <@&${IDNum}>`)
        .addField("IDs", "```" + `User ➔ ${newMember.user.id} \nRole ➔ ${IDNum}` + "```")
        .setTimestamp()

  client.channels.cache.get(txtchannel).send(RoleRemoved)
  }
})

client.on('guildUpdate', (oldGuild, newGuild) => {
  const txtchannel = db.fetch(`loggingChannel_${oldGuild.id}`)
  const GuildNameUpdate = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor(newGuild.name, newGuild.iconURL({ dynamic: true }))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Guild was updated:`)
  .setTimestamp()
  if (oldGuild.name !== newGuild.name) {
    console.log(`Guild was updated: \n Was: ${oldGuild.name} \n Now: ${newGuild.name}`)
    GuildNameUpdate.addField("Name", `Now ➔ **${newGuild.name}** \n Was ➔ **${oldGuild.name}**`)
  }
  if (oldGuild.afkChannel !== newGuild.afkChannel) {
    GuildNameUpdate.addField("AFK Channel", `Now ➔ **${newGuild.afkChannel || "None"}** \n Was ➔ **${oldGuild.afkChannel || "None"}**`)
  }
  if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
    GuildNameUpdate.addField("AFK Timeout", `Now ➔ **${newGuild.afkTimeout.toString() || "None"} s** \n Was ➔ **${oldGuild.afkTimeout.toString() || "None"} s**`)
  }
  if (oldGuild.systemChannelId !== newGuild.systemChannelId) {
    GuildNameUpdate.addField("System Channel Id", `Now ➔ **${newGuild.systemChannelId || "None"}** \n Was ➔ **${oldGuild.systemChannelId || "None"}**`)
  }
  if (oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
    GuildNameUpdate.addField("Rules Channel Id", `Now ➔ **${newGuild.rulesChannelId || "None"}** \n Was ➔ **${oldGuild.rulesChannelId || "None"}**`)
  }
  if (oldGuild.premiumProgressBarEnabled !== newGuild.premiumProgressBarEnabled) {
    var boostb = "";
    var boostb2 = "";
    if(newGuild.premiumProgressBarEnabled === true) boostb = "Enabled"
    if(newGuild.premiumProgressBarEnabled === false) boostb = "Disabled"
    if(oldGuild.premiumProgressBarEnabled === true) boostb2 = "Enabled"
    if(oldGuild.premiumProgressBarEnabled === false) boostb2 = "Disabled"
    GuildNameUpdate.addField("Boost bar", `Now ➔ **${boostb}** \n Was ➔ **${boostb2}**`)
  }
  
  if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
    //new
    var notifications1 = "";
    if (newGuild.defaultMessageNotifications === "MENTIONS") notifications1 = "Mentions only"
    if (newGuild.defaultMessageNotifications === "ALL") notifications1 = "All messages"

    //old
    var notifications2 = "";
    if (oldGuild.defaultMessageNotifications === "MENTIONS") notifications2 = "Mentions only"
    if (oldGuild.defaultMessageNotifications === "ALL") notifications2 = "All messages"
    GuildNameUpdate.addField("Message notifications", `Now ➔ **${notifications1}** \n Was ➔ **${notifications2}**`)
  }
  GuildNameUpdate.addField("IDs", "```" + `Guild ➔ ${oldGuild.id}` + "```")
  client.channels.cache.get(txtchannel).send(GuildNameUpdate)
})

client.on("roleCreate", async (role) => {
  const txtchannel = db.fetch(`loggingChannel_${role.guild.id}`)
  const RoleCreatedEmb = new Discord.MessageEmbed()
  .setColor("ORANGE")
  .setAuthor("ROLE CREATION")
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`A role was created (${role.name})`)
  .addField("Role", role)
  .addField("Name", role.name)
  .addField("Type", role.type || "User")
  .addField("Position", role.position)
  .addField("Color", role.hexColor)
  .addField("IDs", "```" + `Role ➔ ${role.id}` + "```")
  .setTimestamp()
  client.channels.cache.get(txtchannel).send(RoleCreatedEmb)
})

client.on("roleDelete", async (role) => {
  const lang = await db.get(`lang_${role.guild.id}`);
  const txtchannel = db.fetch(`loggingChannel_${role.guild.id}`)
  const RoleDeletedEmb = new Discord.MessageEmbed()
  .setColor("ORANGE")
  .setAuthor(`${await translate('ROLE DELETION', { from: 'en', to: lang })}`)
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`A role was removed (${role.name})`)
  .addField("Role", role)
  .addField("Name", role.name)
  .addField("Reason", "None")
  .addField("IDs", "```" + `Role ➔ ${role.id}` + "```")
  .setTimestamp()
  client.channels.cache.get(txtchannel).send(RoleDeletedEmb)
})

client.on("roleUpdate", (oldRole, newRole) => {
  const txtchannel = db.fetch(`loggingChannel_${oldRole.guild.id}`)
  if(oldRole.permissions === newRole.permissions) {return;} else if (oldRole.permissions !== newRole.permissions) {return;}
  const RoleUpdated = new Discord.MessageEmbed()
  .setColor("WHITE")
  .setAuthor("? | ROLE CHANGED")
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Role was updated (${oldRole.name})`)
  .setTimestamp()
  if(oldRole.name !== newRole.name) {
    RoleUpdated.addField("Name", `Now ➔ **${newRole.name}** \n Was ➔ **${oldRole.name}**`)
  }
  if(oldRole.color !== newRole.color) {
    RoleUpdated.addField("Color", `Now ➔ **${newRole.hexColor}** \n Was ➔ **${oldRole.hexColor}**`)
  }
  RoleUpdated.addField("IDs", "```" + `Role ➔ ${newRole.id}` + "```")
  client.channels.cache.get(txtchannel).send(RoleUpdated)
})

client.on("messageDelete", async (message) => {
  if(message.author.bot) {return}
  else {
  const txtchannel = db.fetch(`loggingChannel_${message.guild.id}`)
  const MessageDeleted = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Message deleted in ${message.channel}`)
  .setTimestamp()
  if(message.content) {
    MessageDeleted.addField("Content", message.content.toString())
  }
  if(message.attachments.size) {
    MessageDeleted.addField("Attachments", message.attachments.join(", "))
  }
  MessageDeleted.addField("IDs", "```" + `User ➔ ${message.author.id} \nMessage ➔ ${message.id}` + "```")
  client.channels.cache.get(txtchannel).send(MessageDeleted)
  }
})

client.on("channelUpdate", async(oldChannel, newChannel) => {
  const txtchannel = db.fetch(`loggingChannel_${oldChannel.guild.id}`)
  let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT"
  let guildChannel = newChannel.guild
  if(!guildChannel || !guildChannel.available) return;
  if(oldChannel.permissions !== newChannel.permissions || oldChannel.permissions === newChannel.permissions) return;

  let types = {
    text: "Text Channel",
    voice: "Voice Channel",
    null: "No Type",
    news: "News Channel",
    store: "Store Channel",
    category: "Category",
  }

  const ChannelUpdated = new Discord.MessageEmbed()
  .setColor("GRAY")
  .setAuthor(newChannel.guild.name, newChannel.guild.iconURL({ dynamic: true }))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Channel was updated: **${newChannel.name}** \n (${newChannel})`)
  .setTimestamp()

  if(oldChannel.name !== newChannel.name) {
    ChannelUpdated.addField("Name", `Now ➔ **${newChannel.name}** \n Was ➔ **${oldChannel.name}**`)
  }
  if(oldChannel.type !== newChannel.type) {
    ChannelUpdated.addField("Type", `Now ➔ **${types[newChannel.type]}** \n Was ➔ **${types[oldChannel.type]}**`)
  }
  if(oldChannel.topic !== newChannel.topic) {
    ChannelUpdated.addField("Topic", `Now ➔ **${newChannel.topic}** \n Was ➔ **${oldChannel.topic}**`)
  }
  if(oldChannel.userLimit !== newChannel.userLimit) {
    ChannelUpdated.addField("Limit", `Now ➔ **${newChannel.userLimit}** \n Was ➔ **${oldChannel.userLimit}**`)
  }
  if(oldChannel.bitrate !== newChannel.bitrate) {
    ChannelUpdated.addField("Bitrate", `Now ➔ **${newChannel.bitrate}** \n Was ➔ **${oldChannel.bitrate}**`)
  }
  if(oldChannel.rtcRegion !== newChannel.rtcRegion) {
    ChannelUpdated.addField("Bitrate", `Now ➔ **${newChannel.rtcRegion}** \n Was ➔ **${oldChannel.rtcRegion}**`)
  }
  if(oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
    ChannelUpdated.addField("SlowMode", `Now ➔ **${newChannel.rateLimitPerUser || "0"}s** \n Was ➔ **${oldChannel.rateLimitPerUser || "0"}s**`)
  }
  if(oldChannel.nsfw !== newChannel.nsfw) {
    ChannelUpdated.addField("IsAgeRestricted?", `Now ➔ **${newChannel.nsfw}** \n Was ➔ **${oldChannel.nsfw}**`)
  }
  ChannelUpdated.addField("IDs", "```" + `Channel ➔ ${newChannel.id}` + "```")
  client.channels.cache.get(txtchannel).send(ChannelUpdated)
})

client.on("channelDelete", async (channel) => {
  const txtchannel = db.fetch(`loggingChannel_${channel.guild.id}`)
  let guildChannel = channel.guild
  if(!guildChannel || !guildChannel.available) return;

  const ChannelRemoved = new Discord.MessageEmbed()
  .setColor("GRAY")
  .setAuthor(channel.guild.name, channel.guild.iconURL({dynamic: true}))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Channel was removed: ${channel.name}`)
  .setTimestamp()

  if(channel.type === "voice") {
    ChannelRemoved.addField("Type", "Voice")
  } else if(channel.type === "text") {
    ChannelRemoved.addField("Type", "Text")
  }

  ChannelRemoved.addField("At", moment(new Date()).format("D/M/YYYY on h:mm:s")) 
  ChannelRemoved.addField("Created at", moment(channel.createdTimestamp).format("D/M/YYYY on h:mm:s") + " " + moment(channel.createdTimestamp).fromNow())
  ChannelRemoved.addField("IDs", "```" + `Channel ➔ ${channel.id}` + "```")
  client.channels.cache.get(txtchannel).send(ChannelRemoved)
})

client.on("channelCreate", async (channel) => {
  const txtchannel = db.fetch(`loggingChannel_${channel.guild.id}`)
  let guildChannel = channel.guild
  if(!guildChannel || !guildChannel.available) return;

  const ChannelCreated = new Discord.MessageEmbed()
  .setColor("GRAY")
  .setAuthor(channel.guild.name, channel.guild.iconURL({dynamic: true}))
  .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
  .setDescription(`Channel was created: **${channel.name}** \n (${channel})`)
  .setTimestamp()

  if(channel.type === "voice") {
    ChannelCreated.addField("Type", "Voice")
  } else if(channel.type === "text") {
    ChannelCreated.addField("Type", "Text")
  } else if(channel.type === "category") {
    ChannelCreated.setDescription(`Category was created: **${channel.name}**`)
    ChannelCreated.addField("Type", "Category")
  }

  ChannelCreated.addField("At", moment(new Date()).format("D/M/YYYY on h:mm:s"))
  ChannelCreated.addField("Created at", moment(channel.createdTimestamp).format("D/M/YYYY on h:mm:s") + " " + moment(channel.createdTimestamp).fromNow())
  ChannelCreated.addField("IDs", "```" + `Channel ➔ ${channel.id}` + "```")
  client.channels.cache.get(txtchannel).send(ChannelCreated)
})

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 15000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);});
client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);});
client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);});
client.on('guildCreate', async (message) => {console.log(`(${message.guild.id})[BOTJN] ${client.user.username} has joined to ${message.guild.name}`)})
client.on('guildRemove', async (message) => {console.log(`(${message.guild.id})[BOTLV] ${client.user.username} was leaved from ${message.guild.name}`)})
client.on('warn', (w) => {return console.log(w)})
client.on('shardError', (e) => {return console.log(e)})
client.on('commandError', (e) => {return console.log(e)})
client.on('invalidated', (e) => {return console.log(e)})
client.login('ODc2MDc1NzA3MDc0MjE1OTU2.GkydiG.G-nAcSMDaDMihRMq6MlnJlpp4JvfTZPmPZWaxA')
