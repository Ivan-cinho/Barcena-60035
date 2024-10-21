import CheckoutHook from "./CheckoutHook";
import Loader from "../Loader/Loader";
import "./Checkout.css"
import "../../App.css"

const Checkout = () => {
    const {
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
    } = CheckoutHook();

    return (
        <div className="checkout">
            <h2>Checkout:</h2>

            {loading ? (
                <Loader />
            ) : (
            <form onSubmit={manejadorFormulario}>
                <div>
                    <label>Nombre</label>
                    <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input type="text" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label>Confirmar Email</label>
                    <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)} value={emailConfirmacion} />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Confirmar Compra</button>

                {ordenId && <strong>¡Gracias por tu compra! Tu número de orden es: {ordenId}</strong>}
            </form>
            )},
        </div>
    );
};

export default Checkout;