import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

import { prettyDate } from "../../utils/utils";
import DeleteBallotButton from "./DeleteBallotButton";

const BallotCard = ({ ballot, refreshBallots }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    Ballot for lottery <b>"{ballot.lottery.name}"</b> received
                    on {prettyDate(ballot.created)}
                </Card.Text>
                <DeleteBallotButton
                    ballot={ballot}
                    refreshBallots={refreshBallots}
                />
            </Card.Body>
        </Card>
    );
};

BallotCard.propTypes = {
    ballot: PropTypes.shape({
        lottery: PropTypes.shape({
            name: PropTypes.string.isRequired,
            created: PropTypes.string,
        }).isRequired,
    }).isRequired,
    refreshBallots: PropTypes.func,
};

export default BallotCard;
