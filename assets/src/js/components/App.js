import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Layout from "./Layout";
import Signup from "./Signup";
import ErrorPage from "./ErrorPage";
import RequiregAuth from "./RequiredAuth";
import Lottery from "./Lottery/Lottery";
import MyBallots from "./Ballots/MyBallots";
import Logout from "./Logout";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                <Route element={<RequiregAuth />}>
                    <Route path="lottery" element={<Lottery />} />
                    <Route path="my-ballots" element={<MyBallots />} />
                    <Route path="logout" element={<Logout />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}
