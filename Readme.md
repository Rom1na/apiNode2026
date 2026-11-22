# 🛍️ API de Productos - Express + Node.js

Esta es una API desarrollada con **Express** para gestionar productos y autenticación de usuarios.

---

## 🚀 Características

- Autenticación de usuarios mediante rutas protegidas
- Gestión de productos a través de endpoints REST
- Middleware personalizado de autenticación
- Configuración de **CORS**
- Manejo de errores 404
- Respuesta base en la raíz de la API

---

## 📦 Tecnologías

- Node.js
- Express
- CORS
- JavaScript ESModules
- JWT

---


## Estructura de documentos en firebase
 
- doc : id,codigo,marca,nombre,precioMax,precioMin,categoria,presentacion.
- dentro de la coleccion Productos.

## Estructura de la respuesta json

- mensaje 
- payload

## Keys de las variables de entorno usadas en el proyecto: 
- APIKEY
- AUTHDOMAIN
- PROJECTID
- STORAGEBUCKET
- MESSAGINGSENDERID
- APPID
- JWT_SECRET_KEY
- MAIL
- PASS

## Endpoints:

- (GET) https://apinode2026.vercel.app/api/products  -> todos los productos  ()
- (GET) https://apinode2026.vercel.app/api/products?categoria=  ->productos con la categoria solicitada  - query params
- (GET) https://apinode2026.vercel.app/api/products/:id   -> productos por id   - path params
- (GET) https://apinode2026.vercel.app/api/descripcion/:descripcion  -> productos por descripcion
- (POST) https://apinode2026.vercel.app/api/create
- (DEL) https://apinode2026.vercel.app/api/delete/:id - path params
- (POST) https://apinode2026.vercel.app/auth/login

Todos los endpoints estan protegidos con auth  excepto la raiz (https://apinode2026.vercel.app/) y  auth/login