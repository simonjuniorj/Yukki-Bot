const config = require("../config.json")
console.log("Ładowanie komend pod /")
const Discord = require("discord.js");
module.exports = (client) => {
    client.on('ready', () => {
        client.api.applications(client.user.id).commands.post({data: {name: "help",description: "Shows you information for every cmd"}});
        client.api.applications(client.user.id).commands.post({data: {name: "info",description: "See some information about Musicium"}});
        client.api.applications(client.user.id).commands.post({data: {name: "invite",description: "Invite the Bot to your Own server and get the ultimate music expierence"}});
        client.ws.on('INTERACTION_CREATE', async interaction => {
            let prefix = await client.settings.get(interaction.guild_id, `prefix`);
            if (prefix === null) prefix = config.prefix;
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            const inviteembed = new Discord.MessageEmbed().setColor(config.colors.yes).setAuthor("Invite me now!").setDescription(`[\`Click here\`](https://discord.com/api/oauth2/authorize?client_id=855125526694723614&permissions=2184527168&scope=bot%20applications.commands)   |   [\`Support Server\`](https://discord.gg/Dmcja7FpdD)   |   :heart: Thanks for inviting!`).setFooter(client.user.username + " | Syntax:  <>...must    []...optional", client.user.displayAvatarURL()).setAuthor(interaction.member.user.username, client.user.displayAvatarURL(), "@Sheep Bot V2#3036")
            const commands = (category) => {
                return client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(", ");
            }
            const info = client.categories
                .map(cat => stripIndents `**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
                .reduce((string, category) => string + "\n\n" + category);
            helpembed.setDescription("*use the Prefix infront of EACH command, to use it correctly!*\n" + info);
            if (command == 'invite') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, inviteembed)
                    }
                });
            }
            if (command == 'info') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, infoembed)
                    }
                });
            }
        });
    });

    async function createAPIMessage(interaction, content) {
        const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();

        return {
            ...apiMessage.data,
            files: apiMessage.files
        };
    }
    console.log('Załadowano komendy pod /');
}
