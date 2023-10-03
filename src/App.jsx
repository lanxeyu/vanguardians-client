import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import * as Pages from "./pages";
import RequireAuth from "./components/RequireAuth";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route index element={<Pages.Home />} />
                <Route path="guardians" element={<Pages.Guardians />} />
                <Route path="guardians/:id" element={<Pages.Guardian />} />
                <Route path="login" element={<Pages.Login />} />
                <Route path="signup" element={<Pages.Signup />} />
                    <Route path="/game" element={<Pages.GamePage />} />
                    <Route path="leaderboard" element={<Pages.Leaderboard />} />

                <Route element={<RequireAuth />}>
                </Route>

                <Route path="*" element={<Pages.NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
