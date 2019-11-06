module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run(message) {
        const settings = await this.client.getSettings()

        if (message.author.bot) return

        if (!message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES')) return

        const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`)
        message.content.match(prefixMention) ? message.reply(`Meu prefixo é  ${settings.prefix}`) : null

        if (message.content.indexOf(settings.prefix) !== 0) return
        const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()

        if (message.guild && !message.member) await message.guild.fetchMember(message.author)

        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
        if (!cmd) return

        if (cmd && !message.guild && cmd.guildOnly) {
            return message.channel.send(`Este comando está indisponível no chat privado. Use no chat do servidor.`)
        }

        cmd.run(message, args)
    }
}