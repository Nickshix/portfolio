module.exports = class {
      constructor(client) {
      this.client = client
      }

      async run(message) {
      global.xp = ''
      global.nextLevel = ''
      let pointsAdd = Math.floor(Math.random() * 7) + 8
      const canal = this.client.channels.get("529064555549294608")
      let database = require('firebase')
      require("firebase").database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
      .once('value').then(async function(snap) {
            if(snap.val() == null) {
                  require("firebase").database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                  .set ({
                        xp: 0,
                        level: 1
                  })
            } else {
                  xp = snap.val().xp + pointsAdd
                       nextLevel = snap.val().level * 500
                  require("firebase").database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                  .update({
                        xp: xp
                  })
                  if(nextLevel <= xp) {
                        nextLevel = snap.val().level + 1
                        require("firebase").database.ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
                        .update({
                              level: nextLevel
                        })

                        canal.send(`@${message.author.username}, Você upou para o level ${nextLevel}`)
                  }
            }
      })
      }
}