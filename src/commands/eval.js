const Command = require('../structures/Command')

module.exports = class Eval extends Command {
    constructor(client) {
        super(client)
        this.name = 'eval'
        this.description = '*****'
        this.aliases = ['e', 'evaluete', 'code']
    }

    async run(message, args) {
      const devID = "582374885595021317"
      if(message.author.id !== devID) return 
      try{
            let codein = args.join(" ");
            let code = eval(codein)
            if(codein == 'this.client.token') return message.reply('Sai daq cabra safado')
            if(typeof code !== 'string') { 
                  code = require('util').inspect(code, { depth: 0 }) 
            }
            message.channel.send({ embed: {
                  color: "110066",
                  fields: [
                        {
                              name: `📥 Entrada`,
                              value: `\`\`\`javascript\n ${codein} \`\`\``
                        },
                        {
                              name:`📤 Resultado`,
                              value: `\`\`\`javascript\n ${code} \`\`\``
                        }
                  ]
            }})
      } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\`\`\``)
      }
    }
}