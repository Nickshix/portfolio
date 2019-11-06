const Command = require('../structures/Command')

module.exports = class Sugestao extends Command {
    constructor(client) {
        super(client)
        this.name = 'dev'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
        const discord = require('discord.js') 
        const dev = args.join(" ")
        if(!dev) {
            let noargs = new discord.RichEmbed()
            .addField(`
            <:mantools:601810155566399506> **Tools**\n**Ira mostrar algumas ferramentas usados no dia a dia**\n`, `<:coding:601810155473993759> **Bot**\n**Ira mostrar informações que \nsomente os desenvolvedores podem saber**`, true
            )
            .setColor('#0062ff')
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL)
            message.channel.send(noargs)
        }
        if(dev == "tools") {
            let tools = new discord.RichEmbed()
            .setDescription(`
            Fiquei com preguiça de fazer, dps eu faço
            `)  
            message.channel.send(tools)
        }
        if(dev == "bot") {
            let tools = new discord.RichEmbed()
            .setDescription(`
            Fiquei com preguiça de fazer, dps eu faço
            `)  
            message.channel.send(tools)

        }
    }      
    }
