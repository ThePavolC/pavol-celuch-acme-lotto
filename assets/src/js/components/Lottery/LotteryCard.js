import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

import BuyBallotButton from "./BuyBallotButton";
import ShowWinnerModalButton from "./ShowWinnerModalButton";
import { prettyDate } from "../../utils/utils";

import "./LotteryCard.css";

const LotteryCard = ({ lottery, refreshCard }) => {
    const headerCopy = lottery.active
        ? `Active lottery on ${prettyDate(lottery.created)}`
        : `Lottery on ${prettyDate(lottery.created)}`;

    const getRandomPrizeIcon = () => {
        const icons = ["💸", "💰", "🧧", "🏆", "🏅", "🎁", "💝"];
        return icons[Math.floor(Math.random() * icons.length)];
    };

    return (
        <Card className="card">
            <Card.Header>{headerCopy}</Card.Header>
            <Card.Body>
                <Card.Title>{lottery.name}</Card.Title>
                <Card.Text>
                    Prize {getRandomPrizeIcon()}: {lottery.prize}
                </Card.Text>
                <Card.Text>Number of ballots: {lottery.num_ballots}</Card.Text>

                {lottery.active ? (
                    <BuyBallotButton
                        lottery={lottery}
                        refreshCard={refreshCard}
                    />
                ) : (
                    <ShowWinnerModalButton lottery={lottery} />
                )}
            </Card.Body>
        </Card>
    );
};

LotteryCard.propTypes = {
    lottery: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        prize: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        num_ballots: PropTypes.number.isRequired,
    }),
    refreshCard: PropTypes.func,
};

export default LotteryCard;
