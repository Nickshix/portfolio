module.exports = class {
      constructor(client) {
          this.client = client
      }
  
      async run(message) {
        let guild = `${this.client.guilds.get('597127981806387210').memberCount}`.split("");
        const contador = ['zero','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        let count = '';
        for(let i = 0; i<guild.length; i++){count += ':'+contador[guild[i]]+':';}
        let canal = this.client.channels.get('600875706259603466');
        canal.setTopic(`Temos atualmente ${count} hehe`);
      }
  }