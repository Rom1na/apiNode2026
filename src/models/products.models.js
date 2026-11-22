import {db} from "../config/db.js";

import{
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";



const productCollection = collection(db,"products");


export const getAllProductsM = async()=>{
        try{
            const productList = await getDocs(productCollection);
            const products =[];
            productList.forEach((doc=>products.push({id: doc.id,...doc.data()})));
            return products;

        }catch (error){
            throw new Error("Error", error.message);

        }


};


export const getByValueM = async(valor)=>{
        try{
            const q  = query (productCollection,where ("categoria","==",valor));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc =>({id: doc.id,... doc.data()}));
        }catch(error){
            console.log('Error realizando la consulta en products:',error);
            throw error;

        }

};


export const obtenerPorIdM = async (idDocumento) => {
  try {
    const docRef = doc(db,  "products", idDocumento);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error obteniendo el documento con ID ${idDocumento}:`, error);
    throw error;
  }
};


export const findByText = async (des) => {
    const searchVal = des
    
    // El truco de Firestore para rangos de prefijos:
    const q = query(
        productCollection,
        where("nombre", ">=", searchVal),
        where("nombre", "<=", searchVal + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const productos = [];
    querySnapshot.forEach((doc) => {
        productos.push({ id: doc.id, ...doc.data() });
    });

    return productos;
};


export const saveProduct = async (product) =>{

        try {
         const newProduct = await addDoc(productCollection,product);
         return newProduct;    
            
        } catch (error) {
          throw new Error("Error", error.message);   
            
        }

};


export const updateProduct = async (id, updatedData) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, updatedData);
        console.log(`Producto con ID ${id} actualizado correctamente.`);
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        throw new Error(`No se pudo actualizar el producto: ${error.message}`);
    }
};



export const deleteProduct = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        let resul

        if (!productSnap.exists()){
            resul = `El producto con ID ${id} no existe.`;
            } else{
                await deleteDoc(productRef);
                resul = `Producto con ID ${id} eliminado correctamente.`;
                console.log(resul);
            }
    

        
        return resul;

    } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        throw new Error(`No se pudo eliminar el producto: ${error.message}`);
    }
};



























//funcion para cargar data automatica y sistematicamente a Firebase. Para dar de alta la base.
export const populateM = async(productosJson)=>{

    try {
    const productosRef = collection(db, 'products'); // Cambiá 'productos' por el nombre de tu colección

    for (const item of productosJson) {
      // Desestructuramos para separar el 'id' viejo del resto de los datos
      const { id, ...datosSinId } = item;
      await addDoc(productosRef, datosSinId);
    }

   
  } catch (error) {
    console.error(error);
    
  }

    return productosJson
};

