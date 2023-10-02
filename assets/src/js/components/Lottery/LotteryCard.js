import React from "react";

import Card from "react-bootstrap/Card";

import BuyBallotButton from "./BuyBallotButton";
import ShowWinnerModalButton from "./ShowWinnerModalButton";
import { prettyDate } from "../../utils/utils";

const LotteryCard = ({ lottery }) => {
    // check proptypes

    const headerCopy = lottery.active
        ? `Active lottery on ${prettyDate(lottery.created)}`
        : `Lottery on ${prettyDate(lottery.created)}`;

    return (
        <Card>
            <Card.Header>{headerCopy}</Card.Header>
            <Card.Body>
                <Card.Title>{lottery.name}</Card.Title>
                <Card.Text>
                    <p>Prize: {lottery.prize}</p>
                    <p>Number of ballots: {lottery.num_ballots}</p>
                </Card.Text>

                {lottery.active ? (
                    <BuyBallotButton lottery={lottery} />
                ) : (
                    <ShowWinnerModalButton lottery={lottery} />
                )}
            </Card.Body>
        </Card>
    );
};

export default LotteryCard;
