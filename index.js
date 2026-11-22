import express from 'express';
import cors from 'cors';
import routes from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import {authentication} from './src/middlewares/authentication.js';
import bodyParser from 'body-parser';

const app = express();
app.set("PORT",3000);

app.use(cors());
app.use(express.json());
/*
la documentación explica usar body parser, pero  express,json() es la  nueva forma nativa
app.use(bodyParser.json());
*/

app.use('/auth',authRouter);

app.get ('/',(req,res) =>{
    res.json({Mensaje: "Raiz de la api, elija un endpoint"})
});

app.use('/auth',authRouter);
app.use("/api",authentication,routes)

app.use((req, res, next) => {
    res.status(404).json({
        error : "404 ruta no encontrada",
        mensaje: `el recurso ${req.url} no existe`
    })
})



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor con express corriendo en el puerto ${PORT}`);
});






