import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { db } from "../../services/config"
import { getDoc, doc } from "firebase/firestore"
import Loader from "../Loader/Loader"

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState(null)
    const [loading, setLoading] = useState(true);

    const {idItem} = useParams()

    useEffect(()=> {
        const nuevoDoc = doc(db, "productos", idItem)
        setLoading(true)
        getDoc(nuevoDoc)
            .then(res => {
                const data = res.data()
                const nuevosProductos = {id: res.id, ...data}
                setProducto(nuevosProductos)
            })
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }, [idItem])

    return (
        <div>
            {loading ? (<Loader />) : (<ItemDetail {...producto}/>)}
        </div>
    )
}

export default ItemDetailContainer