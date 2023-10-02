import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import useAuth from "../hooks/useAuth";
import useCachedAuth from "../hooks/useCachedAuth";

export default function Layout() {
    const { auth } = useAuth();
    const { cachedAuth } = useCachedAuth();

    const isDev = auth?.isStaff || cachedAuth?.isStaff;
    const isLoggedIn = auth?.userId || cachedAuth?.userId;

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

                            {isLoggedIn ? (
                                <>
                                    <Nav.Link as={NavLink} to="/lottery">
                                        Lottery
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/my-ballots">
                                        My Ballots
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/logout">
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/signup">
                                        Signup
                                    </Nav.Link>
                                </>
                            )}

                            {isDev && (
                                <>
                                    <Nav.Link href="/admin/">
                                        Admin (Dev)
                                    </Nav.Link>
                                    <Nav.Link href="/api/">Api (Dev)</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </Container>
    );
}
