import React from "react";

import Container from "react-bootstrap/Container";

import ActiveLottery from "./ActiveLottery";
import AllLotteries from "./AllLotteries";

export default function Lottery() {
    return (
        <Container>
            <ActiveLottery />
            <AllLotteries />
        </Container>
    );
}
