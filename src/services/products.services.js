
import { findByText, getAllProductsM, getByValueM, populateM,updateProduct,deleteProduct,obtenerPorIdM,saveProduct } from "../models/products.models.js";
import p from '../prod.json' with{ type: "json"};



const getAllS = async(categoria)=>{
    if (categoria){
       const rtaFiltrada = await getByValueM(categoria)
       return rtaFiltrada; 
    }else {
       const rtaTodos = await getAllProductsM();
       return rtaTodos;     
    }
}

export const getProductS = async (id) => {
  const product = await obtenerPorIdM(id)
  return product
}





const populateS = async() =>{
    return await populateM(p.productos);
}



const getByDesS = async(des) =>{
    return await findByText(des);
};


const createNewProductS = async (product)=>{
     return await saveProduct (product)

};

const updatePrdS = async (id,updateData) =>{

     return await updateProduct(id,updateData);

};




const deletePrdS = async (id)=>{
     return await deleteProduct(id);
}







export default{getAllS,populateS,getByDesS,createNewProductS,updatePrdS,deletePrdS,getProductS};