const mongoose = require('mongoose');
const settings = require('../controllers/settings')

function connectMongoDb() {
    mongoose.connect(settings.dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('BERHASIL CONNECT KE DATABASE!');
    });
}

module.exports.connectMongoDb = connectMongoDb