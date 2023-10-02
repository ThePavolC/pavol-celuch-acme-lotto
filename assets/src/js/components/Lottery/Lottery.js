import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LotteryCard from "./LotteryCard";
import EmptyCard from "./EmptyCard";

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
            <h1>Active Lottery</h1>
            {activeLottery ? (
                <LotteryCard lottery={activeLottery} />
            ) : (
                <EmptyCard />
            )}

            <h1>All lotteries</h1>
            {allLotteries ? (
                allLotteries.map((l) => (
                    <div key={l.id}>
                        <LotteryCard lottery={l} />
                    </div>
                ))
            ) : (
                <EmptyCard />
            )}
        </Container>
    );
}
