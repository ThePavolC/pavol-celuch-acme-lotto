import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LotteryCard from "./LotteryCard";
import EmptyCard from "./EmptyCard";

export default function Lottery() {
    // check proptypes
    const [activeLottery, setActiveLottery] = useState();
    const [allLotteries, setAllLotteries] = useState([]);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [allLotteriesCount, setAllLotteriesCount] = useState(0);

    const axiosPrivate = useAxiosPrivate();

    const setPrevNextUrls = (data) => {
        setNextUrl(data?.next);
        setPrevUrl(data?.previous);
    };

    const fetchAllLotteries = async (url = "api/lottery/") => {
        const response = await axiosPrivate.get(url);
        setAllLotteries(response.data?.results);
        setPrevNextUrls(response.data);
        setAllLotteriesCount(response.data.count);
    };

    useEffect(() => {
        const fetchActiveLottery = async () => {
            const response = await axiosPrivate.get("api/lottery/active/");
            setActiveLottery(response.data.results && response.data.results[0]);
        };

        fetchActiveLottery();
        fetchAllLotteries();
    }, []);

    const handlePaginationPrevClick = () => {
        fetchAllLotteries(prevUrl);
    };
    const handlePaginationNextClick = () => {
        fetchAllLotteries(nextUrl);
    };

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
                <Container>
                    {allLotteries.map((l) => (
                        <div key={l.id}>
                            <LotteryCard lottery={l} />
                        </div>
                    ))}
                    <Pagination>
                        <Pagination.Prev
                            onClick={handlePaginationPrevClick}
                            disabled={prevUrl ? false : true}
                        />
                        <Pagination.Next
                            onClick={handlePaginationNextClick}
                            disabled={nextUrl ? false : true}
                        />
                        <Pagination.Item disabled>
                            Total: {allLotteriesCount}
                        </Pagination.Item>
                    </Pagination>
                </Container>
            ) : (
                <EmptyCard />
            )}
        </Container>
    );
}
