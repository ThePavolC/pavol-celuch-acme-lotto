import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

import useAuth from "../hooks/useAuth";
import useCachedAuth from "../hooks/useCachedAuth";

import log from "../images/logout.jpg";

export default function Logout() {
    const { setAuth } = useAuth();
    const { setCachedAuth } = useCachedAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setAuth();
        setCachedAuth();
        sessionStorage.clear();

        navigate("/login", { replace: true });
    }, []);

    return (
        <Container>
            <h1>Bye</h1>

            <img src={log} alt="log out" />
        </Container>
    );
}
