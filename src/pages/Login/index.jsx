import { useRef, useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const { setAuth, auth } = useAuth();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", data);
            localStorage.setItem("token", response.data.token);
            const token = localStorage.getItem("token");

            console.log(response.data);

            setAuth(response);
            console.log(auth);

            setUsername("");
            setPassword("");
            navigate("/");
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No server response");
            } else if (errMsg.response?.status === 400) {
                setErrMsg("Missing username or password");
            } else if (errMsg.response?.status === 401) {
                setErrMsg("Unauthorised");
            } else {
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <div id="login-page-container">
            <section className="loginForm">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1 className="signin">Sign In</h1>
                <form id="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button data-testid="login-btn">Sign In</button>
                </form>
                <p>
                    Need an Account?
                    <br />
                    <Link to="/signup" style={{ textDecoration: "underline", color: "#237a20" }}>
                        Sign Up
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default Login;
