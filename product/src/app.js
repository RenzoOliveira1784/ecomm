import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "./config/dbConenect.js";
import routes from "./routes/index.js"
//import swaggerAccount from "../swagger/product.json" assert {type: "json"};

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso');
})

const app = express();
app.use(express.json())
app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerAccount));
routes(app)

export default app;