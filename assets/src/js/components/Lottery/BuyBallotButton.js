import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BuyBallotButton = ({ lottery, refreshCard }) => {
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
            });
            setLoading(false);
            setSuccess(true);
            refreshCard();
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
        <>
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
        </>
    );
};

BuyBallotButton.propTypes = {
    lottery: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        prize: PropTypes.string,
        created: PropTypes.string,
        active: PropTypes.bool,
        num_ballots: PropTypes.number,
    }),
    refreshCard: PropTypes.func.isRequired,
};

export default BuyBallotButton;
