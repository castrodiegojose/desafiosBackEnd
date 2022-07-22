import express from "express";
const app = express();
import compression from "compression";
import router from "./routes/routes.js";

const PORT = parseInt(process.argv[2]) || 8080

app.use(compression())
app.use('/', router);

app.listen(PORT, function() {console.log(`Servidor puerto ${PORT}`)})
