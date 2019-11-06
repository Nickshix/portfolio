const Command = require('../structures/Command')

module.exports = class Reiniciar extends Command {
    constructor(client) {
        super(client)
        this.name = 'reiniciar'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
        if(message.author.id !== "599436503629955072") return;
        await message.channel.send('Reiniciando.. ');
        const canal = this.client.channels.get(this.client.user.lastMessage.channel.id)
        await this.client.destroy()
        await this.client.login(process.env.DISCORD_TOKEN)
        await canal.send('Estou de volta!');
    }      
}
