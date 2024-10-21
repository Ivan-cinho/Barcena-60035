import React from "react";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import ItemListContainerHook from "./ItemListContainerHook";
import "./ItemListContainer.css";
import "../../App.css"

const ItemListContainer = () => {
    const { productos, loading } = ItemListContainerHook(); 

    return (
        <div className="ItemListContainer">
            <h2 style={{ textAlign: "center", color: "rgb(130, 98, 160)", fontSize: "24px" }}>
                Los productos de Marlon Brando
            </h2>
            {loading ? <Loader /> : <ItemList productos={productos} />}
        </div>
    );
};

export default ItemListContainer;