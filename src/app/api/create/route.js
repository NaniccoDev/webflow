const axios = require('axios')

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams
    try {
        const options = {
            method: 'GET',
            url: 'https://api.pagar.me/core/v5/orders/' + searchParams.get('order'),
            headers: {
                accept: 'application/json',
                authorization: 'Basic c2tfNzI0YWNlYzkzNTJlNDczYjllMDc5NjNlMjcxMmEwYjE6'
            }
        }
        const response = await axios.request(options)
        return Response.json(response.data)
    } catch (error) {
        return Response.json({ message: error.message })
    }
}