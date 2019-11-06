const Command = require('../structures/Command')

module.exports = class Chat extends Command {
    constructor(client) {
        super(client)
        this.name = 'chat'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
            const Discord = require('discord.js')
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`Voce nao tem permissao`)
            if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Nao tenho permissao`)
            const embed = new Discord.RichEmbed()
            .setDescription(`**${message.author.username} Você esta preste a alterar as configuraçoes do chat escolha bem**\n <:off:599698676981432332> Para deixar o chat trancado\n <:habilitado:599698696468168714> Para deixar o chat aberto`)
            .setColor('#0062ff')
            .setTimestamp()
            .setFooter(message.author.username)  
            message.channel.send(embed).then(async msg => {
                  msg.react('599698676981432332') // Off
                  msg.react('599698696468168714') // On

                  const filter = (reaction, user) => ['habilitado', 'off'].includes(reaction.emoji.name) && user.id == message.author.id
                  const reactions = await msg.awaitReactions(filter, {max: 1, time: 30 * 1000})

                  const on = new Discord.RichEmbed()
                  .setDescription(`<:habilitado:599698696468168714> O Chat foi habilitado por ${message.author.username}`)
                  .setColor('#0062ff')
                  .setTimestamp()
                  .setFooter(message.author.username)

                  if(reactions.first().emoji.name == 'habilitado') {
                        msg.edit(on)
                        message.channel.overwritePermissions(message.guild.defaultRole.id, {
                              VIEW_CHANNEL: true,
                              SEND_MESSAGES: true
                            })
                        msg.clearReactions()
                  }

                  const off = new Discord.RichEmbed()
                  .setDescription(`<:off:599698676981432332> O Chat foi Desabilitado por ${message.author.username}`)
                  .setColor('#0062ff')
                  .setTimestamp()
                  .setFooter(message.author.username)
                  

                  if(reactions.first().emoji.name == 'off') {
                        msg.edit(off)
                        message.channel.overwritePermissions(message.guild.defaultRole.id, {
                              VIEW_CHANNEL: true,
                              SEND_MESSAGES: false
                        })
                        msg.clearReactions()
                  }

            })
        }      
    }
