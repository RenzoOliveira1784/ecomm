import app from './src/app.js';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PRODUCT_PORT || 3011;


app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})