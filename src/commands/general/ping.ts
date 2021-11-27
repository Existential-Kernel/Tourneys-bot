import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import * as config from "../../config.json"
import LOG from "../../headers/logs.json"

export default {
    category: "General",
    description: "Replies with pong",
    
    slash: false,
    cooldown: "5s",
    
    ownerOnly: false,
    testOnly: true,

    callback: ({ message }) => {
        const embed = new MessageEmbed()
            .setDescription(`🏓 **Pong!** - ${Date.now() - message.createdTimestamp}ms`)
            .setColor(`#${config["color"].default}`);
        message.channel.send({
            embeds: [embed]
        }).catch((error) => {
            const ErrorEmbed = new MessageEmbed()
                .setTitle(config["title"].error)
                .setDescription(`\`\`\`${error}\`\`\``)
                .setColor(`#${config["color"].error}`);
            message.channel.send({ embeds: [ErrorEmbed] });
            console.log(`${LOG["SYSTEM"].ERROR} - ${error}`);
            return;
        });
    }
} as ICommand;