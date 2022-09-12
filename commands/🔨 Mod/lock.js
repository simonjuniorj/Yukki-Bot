const db = require("quick.db");

module.exports = {name: "lock",category: "mod",description: "warns member for an reason",usage: "<#channel>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_SERVER','MANAGE_CHANNELS')) return  
        const ch = message.mentions.channels.first()
	if(!ch) {
	  await message.channel.overwritePermissions([
	    {
	      id: message.guild.id,
              deny : ['SEND_MESSAGES'],
	    },
	  ],)
	  let msg = await message.reply(":white_check_mark: `Channel` " + message.channel + " `has been Locked`")
	  msg.delete(5000)
	}
    }
}