import app from './src/app.js'
import * as dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.ORDER_PORT || 3013;

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`)
})