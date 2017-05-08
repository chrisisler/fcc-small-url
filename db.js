// https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Using-MongoDB-And-Deploying-To-Heroku
// https://coligo.io/create-url-shortener-with-node-express-mongo/

const { MongoClient } = require('mongodb');
const url = String(process.env.MONGOLAB_URI);

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Unable to connect to mongoDB server:', err);
    } else {
        console.log('Connection established:', url);
        db.close();
    }
});
