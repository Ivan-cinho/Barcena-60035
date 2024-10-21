import "../Item/Item.css"
import { Link } from "react-router-dom";

const Item = ({id, nombre, precio, img, stock}) => {
    return (
        <div className="cardProducto">
            <img src={img} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <p>Stock: {stock}</p>
            <Link to={`/item/${id}`} className="link"><button>mas info</button></Link>
        </div>
    )
}

export default Item;