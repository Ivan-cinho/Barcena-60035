import { useState, useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { toast } from "react-toastify";

const ItemDetailHook = (id, nombre, precio, stock) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0);
    const [contador, setContador] = useState(1);

    const { agregarAlCarrito } = useContext(CarritoContext);

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);

        const item = { id, nombre, precio };
        agregarAlCarrito(item, cantidad);
        toast.success("Producto agregado", {
            autoClose: 3000,
            hideProgressBar: true,
            position: "bottom-right",
            theme: "light",
        });

        setContador(1);
    };

    return {
        agregarCantidad,
        contador,
        manejadorCantidad,
        setContador
    };
};

export default ItemDetailHook;