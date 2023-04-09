const express = require('express')
const routes = require('./routes/index.js')
const dotenv = require('dotenv');

dotenv.config();

const app = express()
const port = process.env.FINANCE_PORT || 3024

routes(app)

app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

module.exports = app
