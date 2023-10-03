import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import DatePicker from "react-datepicker";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LotteryCard from "./LotteryCard";
import EmptyCard from "./EmptyCard";
import { Spinner } from "react-bootstrap";

import "./AllLotteries.css";

export default function AllLotteries() {
    const [allLotteries, setAllLotteries] = useState([]);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [allLotteriesCount, setAllLotteriesCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const axiosPrivate = useAxiosPrivate();

    const setPrevNextUrls = (data) => {
        setNextUrl(data?.next);
        setPrevUrl(data?.previous);
    };

    const fetchAllLotteries = async (date = null, url = "api/lottery/") => {
        setLoading(true);
        const params = { date };
        const response = await axiosPrivate.get(url, { params });

        setAllLotteries(response.data?.results);
        setPrevNextUrls(response.data);
        setAllLotteriesCount(response.data.count);

        setLoading(false);
    };

    useEffect(() => {
        fetchAllLotteries();
    }, []);

    const handlePaginationPrevClick = () => {
        fetchAllLotteries(null, prevUrl);
    };
    const handlePaginationNextClick = () => {
        fetchAllLotteries(null, nextUrl);
    };
    const handleDateClick = (date) => {
        setStartDate(date);
        fetchAllLotteries(date);
    };

    return (
        <Container className="all-lotteries-container">
            <div className="header-container">
                <h1>All lotteries</h1>
                <div className="date-picker-container">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => handleDateClick(date)}
                    />
                </div>
            </div>
            {allLotteries ? (
                <>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Container className="cards-container">
                            {allLotteries.map((l) => (
                                <div key={l.id}>
                                    <LotteryCard lottery={l} />
                                </div>
                            ))}
                        </Container>
                    )}
                    <div className="pagination-container">
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
                    </div>
                </>
            ) : (
                <EmptyCard />
            )}
        </Container>
    );
}
