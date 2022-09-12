module.exports = {name: "ban",category: "mod",description: "Bans member for an reason",usage: "[command]",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return 
        const member = message.mentions.members.first()
        if(!member) return message.reply(":x: Please mention a member which you wanna ban!")
        if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply(":x: You cannot punish this member, because u either have the same role or your role is lower")
        const reason = args.slice(1).join(" ") || "Brak";
	try {await member.ban({ reason });message.channel.send(`I successfully banned ${member} for \`${reason}\``)}
        catch (e) {console.error(e)}
    }
}