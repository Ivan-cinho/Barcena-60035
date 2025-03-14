import React, { useEffect, useState } from "react";
import "./WhatsApp.css";
import { db } from "../../services/config"; 
import { doc, getDoc } from "firebase/firestore";

const Whatsapp = () => {
    const [whatsappUrl, setWhatsappUrl] = useState("");

    useEffect(() => {
    const fetchWhatsappUrl = async () => {
        try {
        const whatsappDoc = await getDoc(doc(db, "imagenes", "whatsapp"));
        if (whatsappDoc.exists()) {
            setWhatsappUrl(whatsappDoc.data().ubicacion);
        } else { //una mod
            console.error("El documento 'whatsapp' no existe en la colección 'imagenes'");
        }
        } catch (error) {
        console.error("Error al obtener la URL de WhatsApp:", error);
        }
    };

    fetchWhatsappUrl();
    }, []);

    return (
    <div className="whatsapp-container">
        <a href="https://wa.me/TU_NUMERO_DE_WHATSAPP" target="_blank" rel="noopener noreferrer">
        {whatsappUrl && <img src={whatsappUrl} alt="WhatsApp" className="whatsapp-icon" />}
        </a>
    </div>
    );
};

export default Whatsapp;