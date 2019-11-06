const Command = require('../structures/Command')

module.exports = class Addcmd extends Command {
    constructor(client) {
        super(client)
        this.name = 'addcmd'
        this.description = '*****'
        this.aliases = []
    }

    async run(message, args) {
    console.log(`${message.author.username} Esta utilizando o comando de enviar comando`)
    message.author.send(`Qual linguagem do comando \`JavaScript ou Python\``).then(async msg => {
            message.reply(`Vefique seu privado`)
            const linguagem = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { //Aqui criamos o message collector
                max: 1 //Maximo de mensagens para enviar no message collector
            });
            let lang = [
                "JavaScript",
                "Python"
            ]
            linguagem.on("collect", () => { //Aqui e quando ele coletar o message collector
                message.author.send(`Mande o comando aqui em baixo. **sem code block**`).then(async msg2 => {
                    const codigo = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { //Aqui criamos o message collector
                        max: 1
                    });
                    codigo.on("collect", () => {
                        message.author.send(`@${message.author.send}, Codigo enviado com sucesso`)
                        const Discord = require('discord.js')
                        const embed = new Discord.RichEmbed()
                        .setTitle(`Comando em ${linguagem.collected.first().content}`)
                        .setDescription(`\`\`\` ${codigo.collected.first().content} \`\`\``)
                        .setColor('#0062ff')
                        .setTimestamp()
                        .setFooter(message.author.username, message.author.avatarURL)
                        var canal = this.client.channels.get("601098696842805252")
                        canal.send(embed)
                    })
                })
            })
        })
    }
}