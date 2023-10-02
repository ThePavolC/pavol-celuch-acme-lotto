import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCachedAuth from "../../hooks/useCachedAuth";

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

export default BuyBallotButton;
