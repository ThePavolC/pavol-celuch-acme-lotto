import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Layout() {
    return (
        <Container>
            <h1>✨ BynderLotto ✨</h1>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>🎲</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/signup">
                                Signup
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/lottery">
                                Lottery
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </Container>
    );
}
