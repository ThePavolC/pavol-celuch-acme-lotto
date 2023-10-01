import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useCachedAuth from "../hooks/useCachedAuth";
import axios from "../api/axios";

const Login = () => {
    const { setAuth } = useAuth();
    const { setCachedAuth } = useCachedAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const resetForm = () => {
        setUsername("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/access/login/", {
                username,
                password,
            });

            const token = response?.data?.token;
            const userId = response?.data?.user_id;

            setAuth({ username, userId, password, token });
            setCachedAuth({ username, userId, password, token });

            resetForm();
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing user or password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }
        }
    };

    return (
        <Container>
            <h1>Login</h1>

            <Alert ref={errRef} show={errMsg ? true : false} variant="danger">
                {errMsg}
            </Alert>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        ref={userRef}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

            <p className="mt-2">
                Don't have an account?{" "}
                <Link to="/signup">Create a new one.</Link>
            </p>
        </Container>
    );
};

export default Login;
