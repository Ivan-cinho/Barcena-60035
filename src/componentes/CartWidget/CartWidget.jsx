import React, { useEffect, useState, useContext } from "react";
import "./CartWidget.css";
import { CarritoContext } from "../../Context/CarritoContext";
import { Link } from "react-router-dom";
import { db } from "../../services/config";
import { doc, getDoc } from "firebase/firestore";

const CartWidget = () => {
    const { cantidadTotal } = useContext(CarritoContext);
    const [carritoUrl, setCarritoUrl] = useState("");

    useEffect(() => {
    const fetchCarritoUrl = async () => {
        try {
            const carritoDoc = await getDoc(doc(db, "imagenes", "carrito"));
            if (carritoDoc.exists()) {
            setCarritoUrl(carritoDoc.data().ubicacion);
        } else {
            console.error("El documento 'carrito' no existe en la colección 'imagenes'");
        }
        } catch (error) {
        console.error("Error al obtener la URL del carrito:", error);
        }
    };

    fetchCarritoUrl();
    }, []);

    return (
    <div className="cartwidget">
        {cantidadTotal > 0 && <strong>{cantidadTotal}</strong>}
        <Link to="/cart">
            {carritoUrl && <img className="carrito" src={carritoUrl} alt="Carrito" />}
        </Link>
    </div>
    );
};

export default CartWidget;