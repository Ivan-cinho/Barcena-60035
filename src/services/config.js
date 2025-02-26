import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_ECOMMERCE,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

//////////////////////////////////////////////////////

// import { collection, doc, writeBatch, getDocs } from "firebase/firestore";

// const uploadProductos = async () => {

//   const productosRef = collection(db, "productos")
//   const productosSnapshot = await getDocs(productosRef)
//   const productosExistentes = productosSnapshot.docs.map(doc => doc.data().nombre)
//   const batch = writeBatch(db)
 

//   misProductos.forEach((producto) => {
//     if(!productosExistentes.includes(producto.nombre)) {
//       const nuevoDoc = doc(productosRef)
//       batch.set(nuevoDoc, producto)
//       console.log(`${producto.nombre} agregado`)
//     } else {
//       console.log(`${producto.nombre} ya existe en la base de datos`)
//     }  
//   })
//   // variacion del codigo para que suba solo los objetos del array que no estan ya en firebase

//   try {
//     await batch.commit();
//     console.log("Productos subidos")
//   } catch(error) {
//     console.log("Error al subir productos", error)
//   } 
// }

// uploadProductos()

