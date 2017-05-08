const express = require('express');
const app = express();
//TODO: use counter as shortened url

app.get('/', (req, res) => {
    res.send({
        original_url: '',
        short_url: ''
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
});
