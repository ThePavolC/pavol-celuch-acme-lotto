import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import { prettyDate } from "../utils/utils";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCachedAuth from "../hooks/useCachedAuth";

const BuyBallotButton = ({ lottery }) => {
    // check proptypes
    const { auth } = useAuth();
    const { cachedAuth } = useCachedAuth();

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    const handleBuyBallot = async (e) => {
        setErrMsg("");
        setSuccess(false);
        setLoading(true);

        try {
            await axiosPrivate.post("api/ballot/", {
                lottery: lottery.id,
                user: auth?.userId || cachedAuth?.userId,
            });
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            setLoading(false);
            setErrMsg("Ops something went wrong when creating ballot.");
        }
    };

    const content = loading ? (
        <span>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </span>
    ) : (
        <span>Get ballot</span>
    );

    return (
        <div>
            <Alert
                show={errMsg ? true : false}
                variant="danger"
                onClose={() => setErrMsg("")}
                dismissible
            >
                {errMsg}
            </Alert>
            <Alert
                show={success ? true : false}
                variant="success"
                onClose={() => setSuccess(false)}
                dismissible
            >
                Ballot created
            </Alert>
            <Button onClick={handleBuyBallot}>{content}</Button>
        </div>
    );
};

const ShowWinnerModalButton = ({ lottery }) => {
    // check proptypes
    const [show, setShow] = useState(false);
    const [winner, setWinner] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show winner
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Winner in {lottery.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Winner is {winner}.</p>
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

const LotteryCard = ({ lottery }) => {
    // check proptypes
    return (
        <Card>
            <Card.Header>
                Active lottery for {prettyDate(lottery.created)}
            </Card.Header>
            <Card.Body>
                <Card.Title>{lottery.name}</Card.Title>
                <Card.Text>{lottery.prize}</Card.Text>

                {lottery.active ? (
                    <BuyBallotButton lottery={lottery} />
                ) : (
                    <ShowWinnerModalButton lottery={lottery} />
                )}
            </Card.Body>
        </Card>
    );
};

export default function Lottery() {
    // check proptypes
    const [activeLottery, setActiveLottery] = useState();
    const [allLotteries, setAllLotteries] = useState([]);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchActiveLottery() {
            const response = await axiosPrivate.get("api/lottery/active/");
            setActiveLottery(response.data[0]);
        }
        fetchActiveLottery();

        async function fetchAllLotteries() {
            const response = await axiosPrivate.get("api/lottery/");
            setAllLotteries(response.data);
        }
        fetchAllLotteries();
    }, []);

    return (
        <Container>
            <h1>Lottery</h1>
            {activeLottery && <LotteryCard lottery={activeLottery} />}

            <h1>All lotteries</h1>
            {allLotteries &&
                allLotteries.map((l) => (
                    <div key={l.id}>
                        <LotteryCard lottery={l} />
                    </div>
                ))}
        </Container>
    );
}
