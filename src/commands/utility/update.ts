import { Interaction, Message, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import LOG_TAGS from "../../headers/logs"
const LOG = new LOG_TAGS()
import * as config from "../../config.json"

export default {
    category: "Utility",
    description: "Displays the most recent update of the bot",
    aliases: ["releases"],

    slash: false,
    cooldown: "5s",

    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        try {
            if (config["list"].blacklisted.includes(message.author.id)) { return; }
            const embed = new MessageEmbed()
                .setTitle(`🏷️ Tourneys bot ${config.version} updates 🏷️`)
                .setDescription(`
- Added \`;editsnipe\`, \`;assassinlinks\`, \`;suggest\` and \`;eval\` commands

- Added the "no log" feature so no commands will be logged if you execute either the \`;send\` or \`;announce\` command in secret general
                
- Patch the bot from being in the snipe command output
- Patched the \`;announce\` vulnerability where it doesn't replace pings for the second message argument
- Patched bypassing for the snipe command (sad af)
- Patched the \`;send\` bug where it would break the whole bot if the user ID didn't exist
                
- Fixed \`;kill\` command

**[Full Changelog](https://github.com/Existential-nonce/Tourneys-bot/compare/v2.2...v2.3)**`)
                .setColor(`#${config["color"].default}`);
            message.channel.send({ embeds: [embed]})
        } catch (error) {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG.SYSTEM_ERROR} - ${error}`);
            return;
        }
    }
} as ICommand
