import "../../App.css";
import "./Brand.css";
import React, { useEffect, useState } from "react";
import { db } from "../../services/config";
import { doc, getDoc } from "firebase/firestore";

const Brand = () => {

    const [ brandUrl, setBrandUrl ] = useState("");

    useEffect(() => {
        const fetchBrandUrls = async() => {
            try { //una mod
                const brandDoc = await getDoc(doc(db, "imagenes", "brand"));
                if(brandDoc.exists()) {
                    setBrandUrl(brandDoc.data().ubicacion);
                } else {
                    console.error("el documento brand no existe en la coleccion imagenes");
                }
            } catch (error) {
                console.error("Error al obtener la url de Band", error);
            }
        };
        fetchBrandUrls();
    })

    return (
        <div className="brand">
            <h1>Marlon</h1>
            {brandUrl && <img className="brando" src={brandUrl} alt="Brand"/>}
        </div>
    )
}

export default Brand;