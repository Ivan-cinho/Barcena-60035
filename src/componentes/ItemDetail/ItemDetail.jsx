
import "../ItemDetail/ItemDetail.css";
import Contador from "../Contador/Contador.jsx";
import { Link } from "react-router-dom";
import ItemDetailHook from "./ItemDetailHook.js";

const ItemDetail = ({ id, nombre, precio, img, idCat, stock, descripcion }) => {
    const { agregarCantidad, contador, manejadorCantidad, setContador } = ItemDetailHook(id, nombre, precio, stock);

    return (
        <div className="cardDetail">
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <p>Id: {id}</p>
            <p>Stock: {stock}</p>
            <p>Categoria: {idCat}</p>
            <img src={img} alt={nombre} />
            <p>{descripcion}</p>
            <Contador inicial={contador} stock={stock} funcionAgregar={manejadorCantidad} />

            {agregarCantidad > 0 && (
                <div>
                    <Link to="/cart"><button>Terminar compra</button></Link>
                    <Link to="/"><button>Seguir comprando</button></Link>
                </div>
            )}
        </div>
    );
};

export default ItemDetail;