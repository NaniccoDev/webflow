const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(cors())
app.get('/get', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.pagar.me/core/v5/orders/' + req.query.order,
        headers: {
            accept: 'application/json',
            authorization: 'Basic c2tfNzI0YWNlYzkzNTJlNDczYjllMDc5NjNlMjcxMmEwYjE6'
        }
    }
    const response = await axios.request(options)
    res.send(response.data);
});
app.listen(3000);