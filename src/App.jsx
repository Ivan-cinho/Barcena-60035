
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import ItemListCotainer from "./componentes/ItemListContainer/ItemListContainer";
import NavBar from "./componentes/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./Context/CarritoContext";
import Cart from "./componentes/Cart/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./componentes/Checkout/Checkout";
import Footer from "./componentes/Footer/Footer";
import Whatsapp from "./componentes/WhatsApp/WhatsApp";

const App = () => {
  return (
    <>
      <BrowserRouter>
<CarritoProvider>
      <NavBar/>
        <Routes>
          <Route path="/" element={<ItemListCotainer/>}/>
          <Route path="/categoria/:idCategoria" element={<ItemListCotainer/>}/>
          <Route path="/item/:idItem" element={<ItemDetailContainer/>}/>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
        </Routes>
        </CarritoProvider>
        <ToastContainer />
        <Footer/>
        <Whatsapp/>
      </BrowserRouter>  

    </> 
  )
}

export default App;