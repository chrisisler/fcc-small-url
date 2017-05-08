const mongoose = require('mongoose');
const express = require('express');
const app = express();

const converter = require('./converter'); // For encoding/decoding
const Url = require('./models/url');

const WEB_HOST = 'https://sheltered-earth-28779.herokuapp.com/';

mongoose.connect(String(process.env.MONGOLAB_URI));

app.post('/api/shorten', (req, res) => {
    const long_url = req.params[0].slice(1);
    const longUrlObj = { long_url };

    Url.findOne(longUrlObj, (err, doc) => {
        if (doc) {
            res.send({
                original_url: long_url,
                short_url: WEB_HOST + converter.encode(doc._id)
            });
        } else {
            const newUrl = Url(longUrlObj);
            newUrl.save((err) => {
                if (err) {
                    console.log('Error trying to save newUrl:', err);
                }
                res.send({
                    original_url: long_url,
                    short_url: WEB_HOST + converter.encode(newUrl._id)
                });
            });
        }
    });
});

app.get('/:encoded_id', (req, res) => {
    const id = converter.decode(req.params.encoded_id);

    Url.findOne({ _id: id }, (err, doc) => {
        if (doc) {
            res.redirect(doc.long_url);
        } else {
            res.redirect(WEB_HOST);
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
});
