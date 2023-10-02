import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Button } from "react-bootstrap";
import { prettyDate } from "../utils/utils";

const DeleteBallot = ({ ballot }) => {
    return <Button>Delete</Button>;
};

const Ballot = ({ ballot }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Lottery: {ballot.lottery.name}</Card.Title>
                <Card.Text>
                    Ballot received on {prettyDate(ballot.created)}
                </Card.Text>
                <DeleteBallot ballot={ballot} />
            </Card.Body>
        </Card>
    );
};

const EmptyBallots = () => {
    return <div>No ballots</div>;
};

export default function MyBallots() {
    const [ballots, setBallots] = useState([]);
    const [ballotsCount, setBallotsCount] = useState(0);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [loading, setLoading] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    const setPrevNextUrls = (data) => {
        setNextUrl(data?.next);
        setPrevUrl(data?.previous);
    };

    const fetchBallots = async (url = "api/ballot/my/") => {
        setLoading(true);

        const response = await axiosPrivate.get(url);

        setBallots(response.data?.results);
        setBallotsCount(response.data?.count);
        setPrevNextUrls(response.data);

        setLoading(false);
    };

    useEffect(() => {
        fetchBallots();
    }, []);

    const handlePaginationPrevClick = () => {
        fetchBallots(prevUrl);
    };
    const handlePaginationNextClick = () => {
        fetchBallots(nextUrl);
    };

    return (
        <Container>
            <h1>My Ballots</h1>
            {ballots ? (
                <>
                    <Container>
                        {ballots.map((b) => (
                            <Ballot ballot={b} key={b.id} />
                        ))}
                    </Container>
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
                            Total: {ballotsCount}
                        </Pagination.Item>
                    </Pagination>
                </>
            ) : (
                <EmptyBallots />
            )}
        </Container>
    );
}
