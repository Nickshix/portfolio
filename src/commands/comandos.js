const Command = require('../structures/Command')

module.exports = class Comando extends Command {
    constructor(client) {
        super(client)
        this.name = 'comando'
        this.description = '*****'
        this.aliases = ['commands', 'cmd', 'comandos', 'command']
    }

    async run(message, args) {
            const Discord = require('discord.js')
            const fs = require('fs')      
            const asd = new Discord.RichEmbed()
            .addField('**Este comando foi feito para auxilar os demais em certos comando utilize-os apenas para estudos**', '<:js:599785637230542887> JavaScript\n<:py:599785649154818078> Python')
            .setColor('#0062ff')
            .setTimestamp()
            .setFooter(message.author.username)

            const paraoif = args.join(" ")
            if(!paraoif) {
                message.channel.send(asd).then(async msg => {
                    msg.react('599785649154818078')
                    msg.react('599785637230542887')
  
                    const filter = (reaction, user) => ['py', 'js'].includes(reaction.emoji.name) && user.id == message.author.id
                    const reactions = await msg.awaitReactions(filter, {max: 1, time: 30 * 1000})
  
                    const jsembed = new Discord.RichEmbed()
                    .addField('Comando JavaScript <:js:599785637230542887>', '` setprefix\n eval`', true)
                    .addBlankField()
                    .addField('Quer ajudar nesse projeto?', '\nMande algum comando para o Nickshix#1678', true)
                    .setColor('#0062ff')
                    .setTimestamp()
                    .setFooter(message.author.username)
  
                    if(reactions.first().emoji.name == 'js') {
                          msg.edit(jsembed)
                    }
                    const pyembed = new Discord.RichEmbed()
                    .addField('Comando Python <:py:599785649154818078>', '`No momento não existe nenhum`')
                    .addBlankField()
                    .addField('Quer ajudar nesse projeto?', '\nMande algum comando para o Nickshix#1678')
                    .setColor('#0062ff')
                    .setTimestamp()
                    .setFooter(message.author.username)
                    if(reactions.first().emoji.name == 'py') {
                        msg.edit(pyembed)
                    }
              }) // Fim da reaçao
            }
            if(paraoif === "eval")  {
                var buffer = fs.readFileSync(`./src/commands/pcmd/peval.txt`);
                var cmdeval = new Discord.RichEmbed()
                .addField('Eval <:js:599785637230542887>', `\`\`\`js\n${buffer}\`\`\``, true)
                .setColor('#0062ff')
                .setTimestamp()
                .setFooter(message.author.username)
                message.channel.send(cmdeval)
            }
            if(paraoif === "setprefix") {
                const setprefix = fs.readFileSync(`./src/commands/pcmd/psetprefix.txt`);
                var cmdsetprefix = new Discord.RichEmbed()
                .addField('Setprefix Firebase <:js:599785637230542887>', `\`\`\`js\n${setprefix}\`\`\``)
                .setColor('#0062ff')
                .setTimestamp()
                .setFooter(message.author.username)
                message.channel.send(cmdsetprefix)

            }
    }
}