const Command = require('../structures/Command')

module.exports = class Sugestao extends Command {
    constructor(client) {
        super(client)
        this.name = 'coins'
        this.description = '******'
        this.aliases = []
    }

    async run(message, args) {
      const settings = await this.client.getSettings()
      const database = require("firebase").database()
      database.ref(`Guildas/${message.guild.id}/Usuarios/${message.author.id}`)
      .once('value').then(async function coin(coin) {
        if(coin.val() == null) {
          await message.channel.send(`<:b_online2:585881537493467175> | Você foi adiciado a minha database`)
          database.ref(`enderpearl/Guildas/${message.guild.id}/Usuarios/${message.author.id}`)
          .set({
            coin: 0
          })
        } else {
          database.ref(`enderpearl/Guildas/${message.guild.id}/Usuarios/${message.author.id}`)
          .once('value').then(async function(coin) {
            await message.reply(`Você tem ${coin}`)
          }) 
        }
      })
        
      }      
    }
