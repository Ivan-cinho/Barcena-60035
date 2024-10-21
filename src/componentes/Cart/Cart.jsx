import { useContext } from "react"
import { CarritoContext } from "../../Context/CarritoContext"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import CartItem from "../CartItem/CartItem"
import "./Cart.css"
import "../../App.css"


const Cart = () => {
    const {carrito, total, cantidadTotal, vaciarCarrito} = useContext(CarritoContext)

    const handleVaciarCarrito = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción vaciará todo tu carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Continuar compra'
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
                Swal.fire(
                    'Carrito vacío',
                    'Tu carrito ha sido vaciado.',
                    'success'
                );
            }
        });
    };


    if (cantidadTotal === 0) {
        return (
            <div >
                <h2>no hay productos en el pedido</h2>
                <Link to='/'><button>ver productos</button></Link>
            </div>
        )
    }

    return (
        <div className="cart">
            <div className="cart-items-container">
                {
                    carrito.map(producto => <CartItem key={producto.item.id} {...producto}/>)
                }
            </div>
            <div className="cart-total">
                <h3>Total: ${total}</h3>
                <h3>Catidad total: {cantidadTotal}</h3>
            </div>
            <div className="cart-buttons">
                <button onClick={ handleVaciarCarrito}>Vaciar carrito</button>
                <Link to='/CheckOut'><button>Terminar compra</button></Link>
            </div>
        </div>
    )
}

export default Cart

