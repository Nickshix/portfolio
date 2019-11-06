const Command = require('../structures/Command')

module.exports = class Eval extends Command {
    constructor(client) {
        super(client)
        this.name = 'perms'
        this.description = '*****'
        this.aliases = []
    }

    async run(message, args) {
      const Discord = require('discord.js')
      message.delete().catch(O_o=>{})

      let user = message.mentions.members.first() || message.member;
      let string = '';
      message.channel.permissionsFor(user).toArray().map(p => string += `${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}, `)
      let finalStr = string 
      let embed = new Discord.RichEmbed()
      .setDescription(`Permissões de **${message.author.username}**`)
      .addField(`Lista de permissões:`, `\`\`\`js\n${finalStr}\`\`\``)
      .setColor('#ff0000')
      .setTimestamp(new Date())
      .setFooter(message.author.tag, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      message.channel.send(embed);
      }
    }
