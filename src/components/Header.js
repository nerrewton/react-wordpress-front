import React from "react";
import {
    Navbar,
    Nav,
    NavDropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = props => {
    const { menus } = props;
    if (!menus) return null;

    return (
        <Navbar bg="light" expand="lg">
            <Link to="/" className="navbar-brand">
                Chistes Colombianos
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {menus.map((menu, key) => {
                        if (menu.hijos.length > 0) {
                            return (
                                <NavDropdown
                                    title={menu.nombre}
                                    key={key}
                                    id="basic-nav-dropdown"
                                >
                                    {menu.hijos.map((menu2, key2) => {
                                        return (
                                            <Link
                                                className="dropdown-item"
                                                role="button"
                                                key={key2}
                                                to={menu2.ruta}
                                            >
                                                {menu2.nombre}
                                            </Link>
                                        );
                                    })}
                                </NavDropdown>
                            );
                        }

                        return (
                            <Link to={menu.ruta} key={key} className="nav-link">
                                {menu.nombre}
                            </Link>
                        );
                    })}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
