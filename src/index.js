const { Client, Collection, Discord } = require('discord.js')
const { database } = new (require('./database/Firebase'))(require('./configs/Configs').config)
const path = require('path')
const klaw = require('klaw')
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

class Main extends Client {
    constructor(options) {
        super(options)

        this.logger = require('./modules/Logger')
        this.database = database
        this.settings = this.getSettings().then(result => {this.settings = result})

        this.commands = new Collection()
        this.aliases = new Collection()
    }

    login(token) {
        token = token || process.env.DISCORD_TOKEN
        return super.login(token)
    }

    loadCommands(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}/${commandName}`))(this)
            this.logger.log(`Comando carregado: ${props.name}`, 'log')
            props.location = commandPath
            if (props.init) {
                props.init(this)
            }
            this.commands.set(props.name, props)
            props.aliases.forEach(aliases => {
                this.aliases.set(aliases, props.name)
            })
            return false
        } catch (error) {
            return this.logger.log(`O comando ${commandName.split('.')[0]} não foi carregado: ${error}`, 'error')
        }
    }

    async unloadCommand(commandPath, commandName) {
        let command
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName)
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName))
        }
        if (!command) return `O comando \`${commandName}\` não existe ou não possui aliases.`

        if (command.shutdown) {
            await command.shutdown(this)
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)]
        return false
    }

    async getSettings() {
        var data = ''
        await this.database.ref('enderpearl').once('value')
            .then(snapshot => {
                data = snapshot.val()
            })
            .catch(err => {
                this.logger.log(`Erro ao retornar os dados do banco de dados: ${err}`, 'error')
            })
        return data
    }
}

const client = new Main()

const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
    response.sendStatus(200);
  });
app.listen(process.env.PORT);

const init = async () => {
    klaw('./src/commands').on('data', (item) => {
        const cmdFile = path.parse(item.path)
        if (!cmdFile.ext || cmdFile.ext !== '.js') return
        const response = client.loadCommands(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`)
        if (response) client.logger.error(response)
    })

    const evtFiles = await readdir("./src/events/")
    client.logger.log(`Carregando um total de ${evtFiles.length} eventos.`, "log")
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0]
        client.logger.log(`Evento carregado: ${eventName}`)
        const event = new (require(`./events/${file}`))(client)
        client.on(eventName, (...args) => event.run(...args))
        delete require.cache[require.resolve(`./events/${file}`)]
    })

    client.login()
}

init()