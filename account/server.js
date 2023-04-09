import app from './src/app.js'
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.ACCOUNT_PORT || 3012;


app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})