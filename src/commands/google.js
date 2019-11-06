const Command = require('../structures/Command')

module.exports = class Google extends Command {
    constructor(client) {
        super(client)
        this.name = 'google'
        this.description = '*****'
        this.aliases = ['pesquisar', 'search']
    }

    async run(message, args) {

        message.delete()

        let google = args.slice(0).join(" ")
        
        let link = `https://www.google.com/search?q=${google}`
        if(!link)return message.reply('Console error')
        message.channel.send({embed: {
            color: "110066",
            fields:[
                  {
                      'name':'<:google:599689331321602053> **Procurando no google**',
                      'value':`<@${message.author.id}>`
                  },
                  {
                      'name': 'Pesquisando por',
                      'value': `\`${args.slice(0).join(' ')}\``
                  },
                  {
                        name:'Link:',
                        value: `[Resultado](${link})`
                  },

              ]
        }})
    }
}