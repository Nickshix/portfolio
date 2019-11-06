const config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_URL,
    projectId: process.env.FIREBASE_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
}

module.exports = {
    config
}