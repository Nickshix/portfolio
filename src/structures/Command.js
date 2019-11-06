module.exports = class Command {
    constructor(client) {
        this.client = client
        this.name = 'commandName'
        this.category = 'general'
        this.description = 'Sem descrição'
        this.aliases = []

        this.enabled = true
        this.guildOnly = false
    }

    async run() {}
}