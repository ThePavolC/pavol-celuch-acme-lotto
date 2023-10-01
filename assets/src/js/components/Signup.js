import React from "react";
import { useRef, useState, useEffect } from "react";
import { Alert, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { parseErrorMessage } from "../utils/utils";

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSucess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password1, password2, email]);

    const resetForm = () => {
        setUsername("");
        setPassword1("");
        setPassword2("");
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/access/signup/", {
                username,
                password1,
                password2,
                email,
            });

            resetForm();
            setSucess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg(parseErrorMessage(err.response.data));
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Signup failed");
            }
        }
    };

    return (
        <Container>
            <h1>Signup</h1>

            <Alert ref={errRef} show={errMsg ? true : false} variant="danger">
                {errMsg}
            </Alert>

            {success ? (
                <Alert variant="success">Success</Alert>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            ref={userRef}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword1(e.target.value)}
                            value={password1}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat password"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
            )}

            <p className="mt-2">
                Already have account? <Link to="/login">Login</Link>
            </p>
        </Container>
    );
};

export default Signup;
