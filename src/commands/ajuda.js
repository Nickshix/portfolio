const Command = require('../structures/Command')

module.exports = class Ajuda extends Command {
    constructor(client) {
        super(client)
        this.name = 'ajuda'
        this.description = '****'
        this.aliases = ['help']
    }

    async run(message, args) {
        const Discord = require('discord.js')
        let user = message.author;
        message.react('👍')
        const msg = await message.author.send(new Discord.RichEmbed()
        .setColor([54, 57, 63])    
        .setDescription(`
            • Reaja com <:profile:600343486197137408> para comandos de utilidade
            • Reaja com <:staff:599707977200435221> para comandos de staff
            • Reaja com <:dev:599709781070053438> para comandos de Desenvolvedor
            `)    
            .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)    
        );
        
        const emojis = ['600343486197137408', '599709781070053438', '599707977200435221'];
        for (const i in emojis) {
            await msg.react(emojis[i])
        }
        
        const filter = (r, u) => r.me && u.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { max: 10, time: 60 * 1000 });
        
        collector.on('collect', async (r) => {
            switch(r.emoji.name) {
                case 'profile': // Utilidade
                    msg.edit(new Discord.RichEmbed()
                    .setColor([54, 57, 63])
                    .setDescription(`
                    > \`Botinfo\`\n Informaçoes do bot
                    > \`Serverinfo\`\n Informações do servidor
                    > \`Ajuda\`\n Mostra essa mensagem
                    > \`Comandos\`\n Em Manutenção
                    > \`Perms\`\n Ira mostrar as perms que estiver
                    > \`Uptime\`\n Mostra o temo que o bot estara online
                    > \`Ping\`\n Mostrar ping
                    > \`Google\`\n Fazer uma pesquisa no google
                    > \`Sugestao\`\n Ira fazer sugestão para o bot
                    `)
                    .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)
                    )
                    break;
                case 'staff': // Staff
                    msg.edit(new Discord.RichEmbed()
                    .setColor([54, 57, 63])
                    .setDescription(`
                   > \`Chat\`\n Ira bloquear ou desbloquear o chat
                   > \`Say\`\n Ira fazer com que o bot faça falar uma frase
                   > \`Ban\`\n Banir um usuario
                   > \`Kick\`\n Kickar um usuario
                   > \`Softban\`\n Ira banir escondido
        `)
                    .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)            
                    )
                    break;
                case 'dev':
                    msg.edit(new Discord.RichEmbed()
                        .setColor([54, 57, 63])
                             .setDescription(`
                    > \`Eval\`\n Ira fazer um eval 
                    > \`Setprefix\`\n Ira setar o prefixo do bot
                    > \`Reload\`\n Ira recarregar um comando para do bot
                    > \`Desligar\`\n Desligar o bot
              `)
                    .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)
                    )
                    break;
            }
        }) 
        
    }
}