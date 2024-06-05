const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express()
app.use(cors())

app.get('/get', async (req, res) => {
    try {
        if (req.query.order) {
            const options = {
                method: 'GET',
                url: 'https://api.pagar.me/core/v5/orders/' + req.query.order,
                headers: {
                    accept: 'application/json',
                    authorization: 'Basic ' + process.env.AUTH
                }
            }
            const response = await axios.request(options)
            res.send(response.data)
        } else {
            res.send({ message: 'Error' })
        }
    } catch {
        res.send({ message: 'Error' })
    }
})

app.get('/pay', async (req, res) => {
    try {
        if (req.query.nome && req.query.dia && req.query.turno && req.query.tour && req.query.quantidade && req.query.valor) {
            const options = {
                method: 'POST',
                url: 'https://api.pagar.me/core/v5/orders/',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic ' + process.env.AUTH
                },
                data: {
                    customer: {
                        name: req.query.nome
                    },
                    items: [
                        {
                            quantity: req.query.quantidade,
                            description: req.query.dia + ' - ' + req.query.turno + ' - ' + req.query.tour,
                            amount: req.query.valor + '00'
                        }
                    ],
                    payments: [
                        {
                            payment_method: 'checkout',
                            checkout: {
                                expires_in: (60 * 24 * 2),
                                default_payment_method: 'credit_card',
                                accepted_payment_methods: [
                                    'credit_card', 'pix'
                                ],
                                pix: {
                                    expires_in: (60 * 60 * 24 * 2)
                                },
                                customer_editable: true
                            }
                        }
                    ]
                }
            }
            const response = await axios.request(options)
            res.send(response.data)
        } else {
            res.send({ message: 'Error' })
        }
    } catch {
        res.send({ message: 'Error' })
    }
})

app.listen(3000)
