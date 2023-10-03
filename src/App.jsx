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
<<<<<<< HEAD
                <Route path="/game" element={<Pages.GamePage />} />
                <Route path="leaderboard" element={<Pages.Leaderboard />} />
                <Route element={<RequireAuth />}>
                    
                    
=======
                    <Route path="/game" element={<Pages.GamePage />} />
                    <Route path="leaderboard" element={<Pages.Leaderboard />} />

                <Route element={<RequireAuth />}>
>>>>>>> e6d726b5b3a7bed7795315399c8fc290d58ae5c4
                </Route>

                <Route path="*" element={<Pages.NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
