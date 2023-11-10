import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useNavigate, Link } from "react-router-dom";
import { DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./Header.module.css";
const Header = () => {
    const user = false;
    const headerLogo = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.3em"
            viewBox="0 0 448 512"
            fill="#17ca9f"
        >
            <path d="M0 32c477.6 0 366.6 317.3 367.1 366.3L448 480h-26l-70.4-71.2c-39 4.2-124.4 34.5-214.4-37C47 300.3 52 214.7 0 32zm79.7 46c-49.7-23.5-5.2 9.2-5.2 9.2 45.2 31.2 66 73.7 90.2 119.9 31.5 60.2 79 139.7 144.2 167.7 65 28 34.2 12.5 6-8.5-28.2-21.2-68.2-87-91-130.2-31.7-60-61-118.6-144.2-158.1z" />
        </svg>
    );
    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 448 512"
            fill="#0c5153"
        >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
    );
    const logout = async () => {
        console.log("testing");
    };

    /*styles variables*/
    const navbarStyles = `${styles.header} "bg-body-tertiary"`;
    const navLinkStyles = `${styles.header__navLink} ${"pe-3"}`;
    return (
        <>
            {["lg"].map((expand) => (
                <Navbar key={expand} expand={expand} className={navbarStyles}>
                    <Container fluid className={styles.container}>
                        <Navbar.Brand to="/" as={Link} className={styles.brand}>
                            {headerLogo}
                            <span className={styles.navHeading}>CHS</span>
                        </Navbar.Brand>
                        <Navbar.Toggle className={styles.toggler} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    CHS
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 header__offcanvas">
                                    <Nav.Link as={Link} to="/" className="">
                                        Home
                                    </Nav.Link>
                                    {!user.isLoggedIn && (
                                        <Nav.Link
                                            as={Link}
                                            to="/auth/login"
                                            className="header__navLink"
                                        >
                                            Login
                                        </Nav.Link>
                                    )}
                                    {user.isLoggedIn && (
                                        <DropdownButton
                                            drop="down-centered"
                                            align="end"
                                            variant="secondary"
                                            title={userIcon}
                                            className="pe-3"
                                            bsPrefix={styles.header__dropdown}
                                        >
                                            <Dropdown.Item eventKey="1">
                                                <Nav.Link
                                                    to="/dashboard"
                                                    as={Link}
                                                >
                                                    Dashboard
                                                </Nav.Link>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                eventKey="4"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    )}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default Header;