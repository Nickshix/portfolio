const Command = require('../structures/Command')

module.exports = class Botinfo extends Command {
    constructor(client) {
        super(client)
        this.name = 'botinfo'
        this.description = '*****'
        this.aliases = []
    }

    async run(message, args) {
      const settings = await this.client.getSettings()
      let Discord = require('discord.js')
      let moment = require('moment')
      let embedd = new Discord.RichEmbed()
      .setDescription('<:ender:600147481841631239> **Informaçoes do BOT**')
      .setColor('#0062ff')
      .addField('Nome do bot', this.client.user.username)
      .addField('Servidor Oficial', '[Link](https://discord.gg/8uZJMRs)')
      .addField('Fui criado no dia ', moment(this.client.user.createdAt, "LLLL"))
      .addField('Fui desenvolvido na linguagem', '<:js:599785637230542887> JavaScript')
      .addField('Meu prefixo', settings.prefix)
      message.channel.send(embedd)
    }
    }