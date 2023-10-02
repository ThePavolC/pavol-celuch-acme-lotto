import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LotteryCard from "./LotteryCard";
import EmptyCard from "./EmptyCard";

export default function ActiveLottery() {
    const [activeLottery, setActiveLottery] = useState();

    const axiosPrivate = useAxiosPrivate();

    const fetchActiveLottery = async () => {
        const response = await axiosPrivate.get("api/lottery/active/");
        setActiveLottery(response.data && response.data[0]);
    };

    useEffect(() => {
        fetchActiveLottery();
    }, []);

    const refreshCard = () => {
        fetchActiveLottery();
    };

    return (
        <Container>
            <h1>Active Lottery</h1>
            {activeLottery ? (
                <LotteryCard
                    lottery={activeLottery}
                    refreshCard={refreshCard}
                />
            ) : (
                <EmptyCard />
            )}
        </Container>
    );
}
