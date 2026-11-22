import express from "express";
import productsControllers from "../cotrollers/products.controllers.js";



const routes = express.Router();
routes.get("/products",productsControllers.getProductsC);
routes.get("/products/:id",productsControllers.getProductC);
routes.get('/descripcion/:des',productsControllers.getProductsbyDescC);
routes.post('/create',productsControllers.addProductC);
routes.delete('/delete/:id',productsControllers.deleteProductC);








/*
Ruta utlizada para iniciar la  base datos  de Firebase autonaticamente, un vez utilizada, se comenta para evitar su uso por error 
routes.get("/populate",productsControllers.populateC);
*/

export default routes;