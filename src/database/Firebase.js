
const logger = require('../modules/Logger')
const firebase = require('firebase')

module.exports = class Firebase {
    constructor(config) {
        try {
            firebase.initializeApp(config)
            logger.log('Banco de dados iniciado com sucesso', 'ready')
        } catch (error) {
            logger.log(`Erro ao iniciar o banco de dados: ${error}`, 'error')
        }

        this.database = firebase.database()
    }

}