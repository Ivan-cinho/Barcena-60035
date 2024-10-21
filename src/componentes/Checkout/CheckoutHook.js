import { useState, useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Funciones auxiliares fuera de la lógica principal
const actualizarStock = async (ordenItems) => {
    await Promise.all(
        ordenItems.map(async (productoOrden) => {
            const productoRef = doc(db, "productos", productoOrden.id);
            const productoDoc = await getDoc(productoRef);
            const stockActual = productoDoc.data().stock;

            await updateDoc(productoRef, {
                stock: stockActual - productoOrden.cantidad,
            });
        })
    );
};

const crearOrden = async (orden) => {
    const docRef = await addDoc(collection(db, "ordenes"), orden);
    return docRef.id;
};

const CheckoutHook = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [loading, setLoading] = useState(false);

    const { carrito, vaciarCarrito, total } = useContext(CarritoContext);
    const navigate = useNavigate();

    const manejadorFormulario = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: '¿Estás seguro de confirmar la compra?',
            html: `
            <div style="text-align: left;">
                ${carrito.map((producto) => `
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <span><strong>${producto.item.nombre}</strong> - Cantidad: ${producto.cantidad}</span>
                    </div>
                `).join('')}
                <p><strong>Total: $${total}</strong></p>
            </div>
            <p>Esta acción no se puede deshacer.</p>
        `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, confirmar compra',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) {
            return;
        }

        setLoading(true);

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor completa todos los campos.");
            setLoading(false);
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos del email no coinciden.");
            setLoading(false);
            return;
        }

        const orden = {
            items: carrito.map((producto) => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email,
        };

        try {
            await actualizarStock(orden.items);
            const id = await crearOrden(orden);
            setOrdenId(id);
            vaciarCarrito();
            resetForm();

            // SweetAlert de éxito
            Swal.fire({
                title: '¡Compra confirmada!',
                text: `Gracias por tu compra. El ID de tu orden es: ${id}`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });

            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setEmailConfirmacion("");
        } catch (error) {
            console.log("Error:", error);
            setError("Se produjo un error al procesar la compra.");

            // SweetAlert de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al procesar tu compra. Por favor intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");
        setEmailConfirmacion("");
    };

    return {
        nombre,
        apellido,
        telefono,
        email,
        emailConfirmacion,
        error,
        ordenId,
        loading,
        setNombre,
        setApellido,
        setTelefono,
        setEmail,
        setEmailConfirmacion,
        manejadorFormulario,
    };
};

export default CheckoutHook;