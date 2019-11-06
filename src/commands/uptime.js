const Command = require('../structures/Command')

module.exports = class Google extends Command {
    constructor(client) {
        super(client)
        this.name = 'uptime'
        this.description = '*****'
        this.aliases = []
    }

    async run(message, args) {
    const uptime = ms => {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`;
      }
      message.channel.send(uptime(this.client.uptime));
    }
}