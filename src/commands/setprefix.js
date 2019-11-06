const Command = require('../structures/Command')

module.exports = class Setprefix extends Command {
constructor(client) {
      super(client)
      this.name = 'setprefix'
      this.category = 'Desenvolvedor'
      this.description = '*****'
      this.aliases = ['sp', 'prefix']
      this.guildOnly = false
}

async run(message, args) {
      if(message.author.id !== "582374885595021317") return message.reply({'embed': {
            fields: [
                  {
                        name: message.author.username,
                        value: 'este comando e especialmente do meu desenvolvendor'
                  }
            ]
      }})
      if(args.length === 0) {
            message.channel.send("Sem prefixo alocado para alterar")
      } else if (args.length === 1) {
            let nPrefix = args[0]
            let Discord = require('discord.js')
            let embed = new Discord.RichEmbed()
            .addField('**O meu prefixo foi alterado para:**', `\`\`\` ${nPrefix} \`\`\``, true)
            .setColor('#0062ff')
            .setTimestamp()
            .setFooter(message.author.username)
            require("firebase").database().ref('enderpearl').update({ // Conecta-se a database
                  'prefix' : nPrefix
            }).then(() => {
                  message.channel.send(embed)
            })
      }
}
}