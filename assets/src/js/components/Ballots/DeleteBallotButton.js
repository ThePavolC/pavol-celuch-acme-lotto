import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DeleteBallotButton = ({ ballot, refreshBallots }) => {
    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        setLoading(true);
        try {
            await axiosPrivate.delete(`api/ballot/${ballot.id}/`);
            refreshBallots();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrMsg("Ops something went wrong when deleting ballot.");
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
        <span>Delete ballot</span>
    );

    return (
        <>
            <Alert show={errMsg ? true : false} variant="danger">
                {errMsg}
            </Alert>
            <Button onClick={handleDelete}>{content}</Button>
        </>
    );
};

DeleteBallotButton.propTypes = {
    ballot: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
    refreshBallots: PropTypes.func,
};

export default DeleteBallotButton;
