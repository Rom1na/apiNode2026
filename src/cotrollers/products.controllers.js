import productsService from "../services/products.services.js";

const getProductsC = async (req,res) =>{

    const categoria = req.query.categoria;

    try {
        const products = await  productsService.getAllS(categoria);
        res.status(200).json({message: 'Lista de productos', payload:products});


    } catch (error){
       res
       .status(500)
       .json({message: "error interno del servidor", error: error.message});
    } 
};


const populateC = async (req,res) =>{
    try {
        const products = await productsService.populateS();
        res.status(200).json({message: 'Lista de productos cargados', payload:products});



    } catch (error){
       res
       .status(500)
       .json({message: "error interno del servidor", error: error.message});
    } 
};

const getProductsbyDescC = async(req,res) =>{
      try {
    const des = req.params.des;
    const producto = await productsService.getByDesS(des);

    if (producto.length ===0)
      return res.status(200).json({mensaje:`No se ha encontrado coincidencia con la descripción ${des} `})    


    res.status(200).json({mensaje: `Productos que coinciden con ${des}`,
                          payload: producto});
        
    } catch (error) {
        res
        .status(500)
        .json({mensaje :'Error interno del Servidor',error : error.message})
        
    }



};

const addProductC = async (req,res) =>{
    
    try {
      const {marca,codigo,precioMax,precioMin,nombre, presentacion,categoria} = req.body;
      
      const newProduct={
        marca: marca,
        codigo: codigo,
        precioMax: +precioMax,
        precioMin: +precioMin,
        nombre: nombre,
        presentacion: presentacion,
        categoria: categoria 

      };

      await productsService.createNewProductS(newProduct);
      res.status(200).json({mensaje: 'Nuevo producto creado', payload: newProduct});

    } catch (error) {
       res
      .status(500)
      .json({ message: "error interno del servidor", error: error.message });
        
    }
    
};

const deleteProductC = async (req,res) =>{

   try {
    const id = req.params.id;
    const rta = await productsService.deletePrdS(id);
    res.status(200).json({mensaje: rta});
        
    } catch (error) {
        res
        .status(500)
        .json({mensaje :'Error interno del Servidor',error : error.message})
        
    }

};
export async function getProductC(req, res) {
    const id = req.params.id;
    if(id){
        try{
            const product = await productsService.getProductS(id);
            console.log(product)
            if(product){
                res.send({
                    message: "Producto encontrado",
                    data: product
                })
            }else{
                res.status(404).send({
                    message: "Producto no encontrado"
                })
            }
        }catch(error){
            console.log("ERROR INTERNO", error)
            res.status(500).send({
                message: "Error interno"
            })
        }
    }else{
        res.status(400).send({
            message: "el id del producto es necesario"
        })
    }
}







export default {getProductsC,populateC,getProductsbyDescC,addProductC,deleteProductC,getProductC}