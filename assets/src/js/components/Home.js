import React from "react";
import { Container } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <h1>Home page</h1>
            <p>This is a simple app written in React and Django.</p>

            <p>
                It is a Lotto "game" where there is a new game every day and
                users get ballots for the games.
            </p>

            <p>
                At the end of the day, the scheduled task will pick the random
                user from ballots as a "winner".
            </p>
        </Container>
    );
}
