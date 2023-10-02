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

    const getRandomPrizeIcon = () => {
        const icons = ["💸", "💰", "🧧", "🏆", "🏅", "🎁", "💝"];
        return icons[Math.floor(Math.random() * icons.length)];
    };

    return (
        <Card>
            <Card.Header>{headerCopy}</Card.Header>
            <Card.Body>
                <Card.Title>{lottery.name}</Card.Title>
                <Card.Text>
                    Prize {getRandomPrizeIcon()}: {lottery.prize}
                </Card.Text>
                <Card.Text>Number of ballots: {lottery.num_ballots}</Card.Text>

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
