


const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');
const client = require("../../main");
const config = require('../../config.json');
const prefix = config.prefix;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of commands'),

    async execute(interaction) {
        const supportServerLink = "https://discord.gg/xQF9f9yUEM";
        const githubLink = "https://github.com/GlaceYT";
        const replitLink = "https://replit.com/@GlaceYT";

        const pages = [
            {
                title: "Bot Information",
                description: `This bot offers a comprehensive suite of commands designed to enhance your Discord server experience. It seamlessly integrates both prefix and slash commands\n\n` +
                 `**Developed By:** GlaceYT\n` +
                 `**Version:** 1.0.0\n` +
                 `**Node Version:** v20.12.2\n` +
                 `**Discord.js Version:** 14.15.3\n\n` +
                 `**Features:**\n` +
                 "- Moderation tools for managing your server\n" +
                 "- Fun commands to entertain your members\n" +
                 "- Multiple music systems for listening to music\n" +
                 "- Utility commands for various practical tasks\n" +
                 "- Anime / Hentai / Meme commands \n\n" +
                 `**Usage:**\n` +
                 "Use slash commands or prefix commands to invoke bot commands.\n\n" ,
                commands: [
                    "\nJoin our Discord server - [Discord](https://discord.gg/xQF9f9yUEM)\n\n" +
                    "**Follow us on:**\n" +
                    "- My GitHub Page: [GitHub](https://github.com/GlaceYT)\n" +
                    "- Other bot source: [Replit](https://replit.com/@GlaceYT)\n" +
                    "- Check out My channel: [YouTube](https://www.youtube.com/@GlaceYT)"
                ],
                
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                color: "#3498db", // Blue color
                thumbnail: 
                     "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "ALL IN ONE BOT",
                    iconURL: "https://cdn.discordapp.com/attachments/1230824451990622299/1253655046835408917/2366-discord-developers.gif?ex=6676a4be&is=6675533e&hm=0b39917ea5a274d222a001017886e3b43725191f671b34efe5349f82be57968c&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Lavalink Music Player",
                description: `**Total Commands : **10\n` +
                `**Usage : **Only Prefix commands\n` +
                 "**Support : **Text / Links / Playlists from YouTube\n" ,
                commands: ["``mplay``", "``mskip``", "``mpause``", "``mresume``", "``mstop``", "``mvolume``", "``mshuffle``", "``mqueue``", "``mremove``", "``mnp``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&",
                color: "#FF0000", // Green color
                thumbnail: 
                     "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Lavalink Music Player",
                    iconURL: "https://cdn.discordapp.com/attachments/1230824451990622299/1255146656882622554/8693-youtube-music.png?ex=667c11ea&is=667ac06a&hm=b81b2b2d294019d1c647069c9fa4f4ed09d4d3403aa8fdae2555ff6c1c88e0a9&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Anime Commands",
                description: `**Total Commands : **20\n` +
                `**Usage : **Both Prefix and Slashcommands\n` +
                 "**Type : ** [ SFW ] Images / Gifs \n\n" +
                "Have fun with your friends with different type of expressions and interactions with anime stuff\n",
                commands: ["``blush``", "``bonk``", "``bored``", "``bully``", "``cry``", "``cuddle``", "``dance``", "``highfive``", "``hug``", "``kiss``", "``nervous``", "``pat``", "``sad``", "``scream``", "``slap``", "``stare``", "``thinking``", "``wave``", "``wink``", "``yes``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1253714802048499752/1111.gif?ex=6676dc65&is=66758ae5&hm=9bc3f45ed4930d62def2369c6a27fdd65f24df0fdbe557a7ff7d330090eac1bf&",
                color: "#3428d5", // Purple color
                thumbnail: 
                     "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Anime Commands",
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1255167194036437093/1558-zerotwo-exciteddance.gif?ex=667c250a&is=667ad38a&hm=09e6db36fd79436eb57de466589f21ca947329edd69b8e591d0f6586b89df296&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Basic Commands",
                description: `**Total Commands : **10\n` +
                `**Usage : **Both Prefix and Slashcommands\n` +
                "Basic commands to know about users, channels, server, Bot\n",
                commands: ["``avatar``", "``channelinfo``", "``help``", "``invite``", "``ping``", "``register``", "``servericon``", "``serverinfo``", "``support``", "``userinfo``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                color: "#e67e22", // Orange color
                thumbnail: 
                    "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Bot Documentation",
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Fun Commands",
                description: `**Total Commands : **10\n` +
                `**Usage : **Both Prefix and Slashcommands\n` +
                "Fun commands to spend time\n",
                commands: ["``choose``", "``fact``", "``flip``", "``joke``", "``meme``", "``quote``", "``randomnumber``", "``rate``", "``rockpaperscissors``", "``roll``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                color: "#f39c12", // Yellow color
                thumbnail: 
                    "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Bot Documentation",
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Hentai Commands",
                description: `**Total Commands : **21\n` +
                `**Usage : **Only Prefix\n` +
                 "**Type : ** [ NSFW ] Images / Gifs \n\n" +
                "It seems someone is looking for hentai commands. Please ensure to use these commands only in age-restricted channels.\n",
                commands: ["WILL BE ADDED IN FEW DAYS"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1255160148272353373/Rias.gif?ex=667c1e7b&is=667accfb&hm=cd9d086020fd0e062be92126942d1d683c15a878bb699b000d9db9a34447eb6c&",
                color: "#5ce1e6", 
                thumbnail: 
                    "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Hentai [ NSFW ]",
                    iconURL: "https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=667beaa8&is=667a9928&hm=50dfab0b5a63dab7abdc167899c447041b9717016c71e4ffe377a0d7a989d6b5&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Moderation Commands",
                description: `**Total Commands : **15\n` +
                `**Usage : **Both slash and prefix based\n` +
                "Top notch commands to manage members, channels and messages\n",
                commands: ["``addrole``", "``ban``", "``dm``", "``kick``", "``lock``", "``mute``", "``nickname``", "``purge``", "``removerole``", "``removeslowmode``", "``setslowmode``", "``timeout``", "``unlock``", "``unmute``", "``warn``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264193592508027013/All_in_one_1.png?ex=669cfb88&is=669baa08&hm=b95287a86c56f5a3b9ada7566503a38a52d3da482db7ce1bce9a2ea638982e39&",
                color: "#3498db", // Blue color
                thumbnail: 
                     "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Bot Documentation",
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Distube Commands",
                description: `**Total Commands : **11\n` +
                `**Usage : **Both Prefix and Slashcommands\n` +
                 "**Support : **Text / Links \n" +
                 "**Platforms : **YouTube, Spotify, SoundCloud \n\n" +
                 "Distube is a powerful Discord music library that offers an enhanced music experience. It's easy to use with both prefix and slash commands, making it accessible to all users.\n",
                commands: ["``autoplay``", "``filters``", "``loop``", "``nowplaying``", "``pause``", "``play``", "``queue``", "``resume``", "``seek``", "``skip``", "``stop``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1255157373002055770/D.gif?ex=667c1be5&is=667aca65&hm=af6e7ad9fe7a4c6080d770cd4ecf3e38d359a739f628b9e967426339aace07be&",
                color: "#00fff0", 
                thumbnail: 
                    "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Distube Player",
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1255155569250013236/76640873.png?ex=667c1a37&is=667ac8b7&hm=6a888b3748dbe4c8245fe632fafc31f28bd719a1921ed51ec11eb63f44dc5aec&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            },
            {
                title: "Utility Commands",
                description: `**Total Commands : **8\n` +
                `**Usage : **Both Prefix and Slashcommands\n\n` +
                 "These are advanced commands helps in daily tasks easily.\n",
                commands: ["``poll``","``define``", "``dictionary``", "``qr``", "``remind``", "``status``", "``timer``", "``translate``"],
                image: "https://cdn.discordapp.com/attachments/1246408947708072027/1264191161212342282/GlaceYT_1.png?ex=669cf944&is=669ba7c4&hm=3170787ef8dfcde922996ce7bdbaf909c4a18b3e9d757cee8b020ddc70e12c84&",
                color: "#3498db", 
                thumbnail: 
                    "https://cdn.discordapp.com/attachments/1246408947708072027/1264191552998342687/All_in_one.png?ex=669cf9a1&is=669ba821&hm=eec8a5ec58467205c61757d7b4450785b31dc739e7351f3e5ce230d7eb6fb1d9&"
                ,
                author: {
                    name: "Utility Commands",
                    iconURL: "https://cdn.discordapp.com/attachments/1230824451990622299/1255164064192270418/2861-tool.gif?ex=667c2220&is=667ad0a0&hm=17d2f57af30831b62639fd3d06853a7bc423e1a96b36e5994f432b65aa9f30dc&",
                    url: "https://discord.gg/xQF9f9yUEM"
                }
            }
        ];

        let currentPage = 0;

        const createEmbed = () => {
            const page = pages[currentPage];
            const fieldName = page.title === "Bot Info" ? "Additional Information" : "Commands";
            return new EmbedBuilder()
                .setDescription(page.description)
                .setColor(page.color)
                .setImage(page.image)
                .setThumbnail(page.thumbnail)
                .setAuthor({ name: page.author.name, iconURL: page.author.iconURL, url: page.author.url })
                .addFields(
                    { name: fieldName, value: page.commands.join(', ') }
                );
        };

        const createActionRow = () => {
            return new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage === pages.length - 1)
                );
        };

        const createDropdown = () => {
            return new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('page-select')
                        .setPlaceholder('Select a page')
                        .addOptions(pages.map((page, index) => ({
                            label: page.title,
                            value: index.toString()
                        })))
                );
        };

        // Check if the interaction is a slash command or a message command
        if (interaction.isCommand && interaction.isCommand()) {
            await interaction.deferReply();
            await interaction.editReply({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });

            const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });

            collector.on('collect', async (button) => {
                if (button.user.id !== interaction.user.id) return;

                if (button.isButton()) {
                    if (button.customId === 'previous') {
                        currentPage = (currentPage - 1 + pages.length) % pages.length;
                    } else if (button.customId === 'next') {
                        currentPage = (currentPage + 1) % pages.length;
                    }
                } else if (button.isSelectMenu()) {
                    currentPage = parseInt(button.values[0]);
                }

                try {
                    await button.update({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });
                } catch (error) {
                    console.error('Failed to update interaction:', error);
                }
            });

            collector.on('end', async () => {
                try {
                    const replyMessage = await interaction.fetchReply();
                    await replyMessage.edit({ components: [] });
                } catch (error) {
                    console.error('Failed to fetch or edit reply:', error);
                }
            });
        } else if (interaction.content.startsWith(prefix + 'help')) {
            const message = interaction;
            const sentMessage = await message.reply({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });
        
            const collector = message.channel.createMessageComponentCollector({ time: 60000 });
        
            collector.on('collect', async (button) => {
                if (button.user.id !== message.author.id) return;
        
                if (button.isButton()) {
                    if (button.customId === 'previous') {
                        currentPage = (currentPage - 1 + pages.length) % pages.length;
                    } else if (button.customId === 'next') {
                        currentPage = (currentPage + 1) % pages.length;
                    }
                } else if (button.isSelectMenu()) {
                    currentPage = parseInt(button.values[0]);
                }
        
                try {
                    await button.update({ embeds: [createEmbed()], components: [createDropdown(), createActionRow()] });
                } catch (error) {
                    console.error('Failed to update interaction:', error);
                }
            });
        
            collector.on('end', async () => {
                try {
                    await sentMessage.edit({ components: [] });
                } catch (error) {
                    console.error('Failed to edit message components:', error);
                }
                message.reply('The help session has ended.').then(msg => setTimeout(() => msg.delete(), 5000));
            });
        }
    }
};
