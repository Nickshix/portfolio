const Command = require('../structures/Command')

module.exports = class Ping extends Command {
    constructor(client) {
        super(client)
        this.name = 'ping'
        this.description = 'Mostra a latência e o tempo de reposta do Bot.'
        this.aliases = ['latency']
    }

    async run(message, args) {

        const botping = new Date() - message.createdAt;
        const botms = Math.floor(botping)
        const apims = Math.floor(this.client.ping)

        message.channel.send({"embed": {
            color: "110066",
            fields:[
                {
                    'name':'<:network:599668333473955840> **PING API**:',
                    'value':`\`\`\`fix\n${apims}ms\`\`\``,
                    'inline': true
                },
                {
                    'name': '<:network:599668333473955840> **PING BOT**:',
                    'value': `\`\`\`fix\n${botms}ms\`\`\``,
                    'inline': true
                }
            ]
        }})
    }
}