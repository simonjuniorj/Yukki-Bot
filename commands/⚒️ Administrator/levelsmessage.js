const discord = require('discord.js')
const db = require('quick.db')
const prefix = require('../../config.json');

module.exports = {name: "set-levels-message",category: "admin",description: "Sends detailed info about the client",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: `You dont have enough permission to execute this command!`")
        if(!args) return message.channel.send(":x: `No args provided`")
	if(args != "(level)") return message.reply(":x: `One or more arguments are missing, please try again!`")
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
	try {       
	    message.channel.send(":white_check_mark: Successfully set the levels message to " + args.join(' ').replace("(user)", message.author.username).replace("(level)", level))
            db.set(`farewellMessage_${message.guild.id}`, args.join(' ').replace("(user)", message.author.username).replace("(level)", level))
	} catch (e) {
	    console.log(e)
	    messace.channel.send(":x: An error occured.. : `" + e + "`")
	}
    }
}