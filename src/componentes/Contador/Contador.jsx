import { useEffect, useState } from "react"
import "./Contador.css"
import "../../App.css"

const Contador = ({inicial, stock, funcionAgregar}) => {

    const [contador, setContador] = useState(inicial)

    useEffect(() => {
        setContador(inicial)
    }, [inicial])

    const sumarContador = () => {
        if (contador < stock) {
            setContador(contador +1)
        }
    }

    const restarContador = () => {
        if (contador > 1) {
            setContador(contador -1)
        }
    }

    return(
        <>
        <div className="contador">
            <button onClick={sumarContador}>+</button>
            <p>{contador}</p>
            <button onClick={restarContador}>-</button>
        </div>
        <button onClick={()=> funcionAgregar(contador)}>Agregar al pedido</button>
        </>
    )   
}

export default Contador

