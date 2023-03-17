import app from './app.js'
const port = process.env.PORT || 3000;
import {} from 'dotenv/config';

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
})