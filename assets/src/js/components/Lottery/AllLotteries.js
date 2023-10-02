import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LotteryCard from "./LotteryCard";
import EmptyCard from "./EmptyCard";
import { Spinner } from "react-bootstrap";

export default function AllLotteries() {
    const [allLotteries, setAllLotteries] = useState([]);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [allLotteriesCount, setAllLotteriesCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    const setPrevNextUrls = (data) => {
        setNextUrl(data?.next);
        setPrevUrl(data?.previous);
    };

    const fetchAllLotteries = async (url = "api/lottery/") => {
        setLoading(true);

        const response = await axiosPrivate.get(url);

        setAllLotteries(response.data?.results);
        setPrevNextUrls(response.data);
        setAllLotteriesCount(response.data.count);

        setLoading(false);
    };

    useEffect(() => {
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
            <h1>All lotteries</h1>

            {allLotteries ? (
                <>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Container>
                            {allLotteries.map((l) => (
                                <div key={l.id}>
                                    <LotteryCard lottery={l} />
                                </div>
                            ))}
                        </Container>
                    )}
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
                </>
            ) : (
                <EmptyCard />
            )}
        </Container>
    );
}
