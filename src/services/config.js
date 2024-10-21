import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_ECOMMERCE,
  authDomain: "trabajo-final-react-coderhouse.firebaseapp.com",
  projectId: "trabajo-final-react-coderhouse",
  storageBucket: "trabajo-final-react-coderhouse.appspot.com",
  messagingSenderId: "530440859495",
  appId: "1:530440859495:web:adc6847620af09dd0789c2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

//////////////////////////////////////////////////////

const misProductos = [
  {nombre: "Item 1" , stock: 10, precio: 200, img: "https://picsum.photos/300?random=1", idCat: "A", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 2", stock: 20, precio: 300, img: "https://picsum.photos/300?random=5", idCat: "A", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 3", stock: 30, precio: 400, img: "https://picsum.photos/300?random=8", idCat: "B", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 4", stock: 40, precio: 500, img: "https://picsum.photos/300?random=54", idCat: "B", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 5", stock: 50, precio: 600, img: "https://picsum.photos/300?random=10", idCat: "A", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 6", stock: 60, precio: 700, img: "https://picsum.photos/300?random=21", idCat: "B", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 7", stock: 70, precio: 800, img: "https://picsum.photos/300?random=14", idCat: "A", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 8", stock: 80, precio: 900, img: "https://picsum.photos/300?random=16", idCat: "B", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."},
  {nombre: "Item 9", stock: 90, precio: 1000, img: "https://picsum.photos/300?random=33", idCat: "A", descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
]

import { collection, doc, writeBatch, getDocs } from "firebase/firestore";

const uploadProductos = async () => {

  const productosRef = collection(db, "productos")
  const productosSnapshot = await getDocs(productosRef)
  const productosExistentes = productosSnapshot.docs.map(doc => doc.data().nombre)
  const batch = writeBatch(db)
 

  misProductos.forEach((producto) => {
    if(!productosExistentes.includes(producto.nombre)) {
      const nuevoDoc = doc(productosRef)
      batch.set(nuevoDoc, producto)
      console.log(`${producto.nombre} agregado`)
    } else {
      console.log(`${producto.nombre} ya existe en la base de datos`)
    }  
  })
  // variacion del codigo para que suba solo los objetos del array que no estan ya en firebase

  try {
    await batch.commit();
    console.log("Productos subidos")
  } catch(error) {
    console.log("Error al subir productos", error)
  } 
}

uploadProductos()

