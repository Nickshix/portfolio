const Command = require('../structures/Command')

module.exports = class Say extends Command {
    constructor(client) {
        super(client)
        this.name = 'say'
        this.description = '*****'
        this.aliases = ['dizer', 's']
    }

    async run(message, args) {

        message.delete()
        if(!args.join(" ")) return message.reply('Digite algo!')
        let say = args.join(' ')

        message.channel.send({embed: {
            color: "110066",
            description: `<:say:599679358898012180> > ${say}`
        }})

    }
}