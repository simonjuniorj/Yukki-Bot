const Discord = require("discord.js")
const {version} = require("discord.js");
let os = require('os')
let cpuStat = require("cpu-stat")
module.exports = {name: "botinfo",category: "info",description: "Sends detailed info about the client",usage: "[command]",
    run: (client, message) => {
        cpuStat.usagePercent(function (err, percent) {
            if (err) {return console.log(err);}
            let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map(guild => guild)
            for (let i = 0; i < guilds.length; i++) {if (guilds[i].me.voice.channel) connectedchannelsamount += 1;}
            const botinfo = new Discord.MessageEmbed()
                .setAuthor(client.user.username + " Bot information", client.user.displayAvatarURL({dynamic: true}))
                .setDescription(`\`→ RAM:\` \n ⏳ Usage → \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\` \n ⏳ Avaliable → \`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\` \n \`→ DEBUG:\` \n 📁 Users with our bot → \`${client.users.cache.size}\` \n 📁 Servers currently bot in → \`${client.guilds.cache.size}\` \n 📁 Voice channels → \`${client.channels.cache.filter(ch => ch.type === "voice").size}\` \n 📁 Bot is on voice channels → \`${connectedchannelsamount}\` \n \`→ Libraries:\` \n **Discord.js** → \`${version}\` \n **Node.js** → \`${process.version}\` \n \`→ CPU:\` \n 🤖 CPU Model → \`${os.cpus().map(i => `${i.model}`)[0]}\` \n 🤖 CPU Usage → \`${percent.toFixed(2)}%\` \n 🤖 Arch → \`${os.arch()}\` \n \`→ System:\` \n 💻 Bot uses \`${os.platform()}\` platform \n \`→ Ping:\` \n API Latency → \`${(client.ws.ping - 110)}ms\``)
                .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
            message.channel.send(botinfo)
        });
    }
};