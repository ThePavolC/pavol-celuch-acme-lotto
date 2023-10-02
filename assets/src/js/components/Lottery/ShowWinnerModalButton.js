import React, { useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";

const ShowWinnerModalButton = ({ lottery }) => {
    // check proptypes
    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    const [winnerName, setWinnerName] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const handleClose = () => {
        setShow(false);
        setErr("");
    };

    const handleShow = async () => {
        try {
            async function fetchWinner() {
                const response = await axiosPrivate.get(
                    `api/lottery-winner/${lottery.id}/`
                );
                setWinnerName(response.data.user.username);
            }
            await fetchWinner();
        } catch (error) {
            if (error.response.status === 404) {
                setErr("No winner found.");
            } else {
                setErr("Something went wrong when getting a winner.");
            }
        }

        setShow(true);
    };

    const winnerCopy = winnerName ? `Winner is ${winnerName}.` : "";

    return (
        <>
            <Button variant="info" onClick={handleShow}>
                Show winner
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Winner in {lottery.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger" show={err ? true : false}>
                        {err}
                    </Alert>
                    {winnerCopy}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowWinnerModalButton;
