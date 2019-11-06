const Command = require('../structures/Command')

module.exports = class Sugestao extends Command {
    constructor(client) {
        super(client)
        this.name = 'sugestao'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
          let sugestao = args.join(" ")
          if(!sugestao) return message.reply('Insira uma sugestão')
          
          var canal = this.client.channels.get("599702759117160448")
          if (!canal) return message.reply("Não existe um canal para sugestao crie com o nome de `📌sugestao`");
          canal.send({embed: {
            color: "110066",
            fields: [
                  {
                        name: '📌 **Sugestão**',
                        value: `\`\`\`fix\n${sugestao}\`\`\``
                  }
            ]
          }}).then(msg => msg.react("599702036673593398").then(r => msg.react("599702060983648286"))) 
          message.reply(`,Sua sugestão foi enviada`)
      }      
    }
