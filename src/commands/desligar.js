const Command = require('../structures/Command')

module.exports = class Sugestao extends Command {
    constructor(client) {
        super(client)
        this.name = 'desligar'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
            const Discord = require('discord.js')
            const dev = "582374885595021317"
            if(message.author.id !== dev) return message.reply('Voce nao pode usar este comando')
            const embed = new Discord.RichEmbed()
                  .setDescription(`@${message.author.id} Bot sendo desligado pelo painel Manager`)
                  .setFooter('Para religar entro no painel Manager e aperte me ligar')
            message.channel.send(embed)          
            await process.exit()
      }      
    }
