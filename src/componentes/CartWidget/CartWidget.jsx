import "./CartWidget.css";
import { useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { Link } from "react-router-dom";
import "./CartWidget.css"
import "../../App.css"

const CartWidget = () => {

    const {cantidadTotal} = useContext(CarritoContext)

    return (
        <div className="cartwidget">
            { cantidadTotal > 0 && <strong>{cantidadTotal}</strong>}
            <Link to='/cart'>
            <img className="carrito" src="../../../public/InsaneAssFireCarrito.png" alt="InsaneAssFireCarrito"/>
            </Link>            
        </div>
    )
}

export default CartWidget;