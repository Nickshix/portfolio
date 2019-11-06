module.exports = class Ready {
    constructor(client) {
        this.client = client
    }

    async run() {
        this.client.appInfo = await this.client.fetchApplication()
        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication()
        }, 60000)

        let servers = this.client.guilds.size > 1 ? 'Servidores' : 'Servidor'
        this.client.user.setActivity(`${this.client.settings.prefix}help | ${this.client.guilds.size } ${servers}`)

        this.client.logger.log(`${this.client.user.tag} iniciado com sucesso`, 'ready')
    }
}