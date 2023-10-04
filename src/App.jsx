import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Header2 } from "./components";
import * as Pages from "./pages";
import RequireAuth from "./components/RequireAuth";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Header2 />}>
                <Route index element={<Pages.Home />} />
            </Route>
            <Route path="/" element={<Header />}>
                <Route path="guardians" element={<Pages.Guardians />} />
                <Route path="guardians/:id" element={<Pages.Guardian />} />
                <Route path="login" element={<Pages.Login />} />
                <Route path="signup" element={<Pages.Signup />} />
                <Route path="/game" element={<Pages.GamePage />} />

                <Route element={<RequireAuth />}>
                    <Route path="leaderboard" element={<Pages.Leaderboard />} />
                </Route>
                <Route path="leaderboard" element={<Pages.Leaderboard />} />
                <Route path="*" element={<Pages.NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
