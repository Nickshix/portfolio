const Command = require('../structures/Command')

module.exports = class Userinfo extends Command {
    constructor(client) {
        super(client)
        this.name = 'userinfo'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
        const moment = require('moment')
        const Discord = require('discord.js')
        moment.locale('pt-BR')
        let User
        if (!args[0]) User = message.member // Se nao for passado primeiro arg, User é quem digitou deu comando
        let mention = message.mentions.members.first() // Se houve mention, ela é true 
        if (mention) User = mention 
        if (!User) {
            try {
                console.log('Entrei no block try')
                User = message.guild.members.get(args[0]) 
                if (!User) return message.channel.send('Usuario não encontrado') 
            }
            catch(err) {
                console.log('Entrei no bloco catch')
                return 
            }
        }
        const contaCriada = moment(User.user.createdTimestamp).format('lll') // Formato DD do MMM do AAAA às hh:mm
        const diasContaCriada = moment.duration(message.createdTimestamp - User.user.createdTimestamp).asDays() // Dias de criaçao da conta
        const entrouNoServer = moment(User.joinedTimestamp).format('lll') // Data de entrada no server
        const diasEntrouNoServer = moment.duration(message.createdTimestamp - User.joinedTimestamp).asDays() // Dias de entrada no server
        const embed1 = new Discord.RichEmbed()
            .setTitle(`Perfil de ${User.user.username}`)
            .setColor('#36393f')
            .setThumbnail(User.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .addField(`Discord tag`, User.user.tag)
            .addField(`Entrou no Discord em:`, `${contaCriada} (${Math.floor(diasContaCriada)} dias)`)
            .addField(`Entrou no server em:`, `${entrouNoServer} (${Math.floor(diasEntrouNoServer)} dias)`)
            .setDescription(`Cargos: ${User.roles.map(r => r).join(' ')}`)
            const embed2 = new Discord.RichEmbed()
            .setTitle(`Perfil de ${User.user.username}`)
            .setColor('#36393f')
            .setThumbnail(User.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .addField(`Discord tag`, User.user.tag, true)
            .addField(`Entrou no Discord em:`, `${contaCriada} (${Math.floor(diasContaCriada)} dias)`, true)
            .addField(`Entrou no server em:`, `${entrouNoServer} (${Math.floor(diasEntrouNoServer)} dias)`, true)
            .setDescription(`Cargos: ${User.roles.map(r => r).join(' ')}`)
            .addField('Você é o meu desenvolvedor', 'me atualiza seu corno', true)
            if(message.author.id !== '582374885595021317') {
                message.channel.send(embed1)
            }
            if(message.author.id == '582374885595021317' && User.id == '582374885595021317') {
                message.channel.send(embed2)
            }
    }
        
        }

        

