const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counter = mongoose.model('counter', new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
}));

const urlSchema = new Schema({
    _id: {
        type: Number,
        index: true
    },
    long_url: String,
    created_at: Date
});

/** This callback is executed every time before an entry is saved to the urls collection. */
urlSchema.pre('save', function(next) {
    const doc = this;
    counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } }, (err, counter) => {
        if (err) {
            return next(err);
        }
        /**
         * "Before saving an entry in the urls collection, increment the global
         * url_count in the counters collection and use that as the _id field
         * of the urls collection."
         */
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
    });
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
