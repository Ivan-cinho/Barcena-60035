import "../../App.css"
import "./NavBar.css"; 
import Brand from "../Brand/Brand.jsx";
import CartWidget from "../CartWidget/CartWidget.jsx";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <header>
            <Link to="/">
                <Brand/>
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/categoria/A">Categoria A</NavLink>
                    </li>
                    <li>
                    <NavLink to="/categoria/B">Categoria B</NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget/>
        </header>
    )
}

export default NavBar;