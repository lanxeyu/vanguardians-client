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

    const { setUser, user } = useAuth();

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
            const response = await axios.post(
                "https://vanguardians-server.onrender.com/login",
                data
            );
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.username);

            localStorage.setItem("user_id", response.data.user.user_id);

            // const token = localStorage.getItem("token");
            // const userInfo = localStorage.getItem("user");

            setUser({
                user_id: response.data.user.user_id,
                username: response.data.user.username
            });


            // console.log(token);

            // console.log(token);
            // const options = {
            //     headers: {
            //         token: token,
            //     },
            // };
            // const response2 = await axios.post("http://127.0.0.1:5000/auth", options);

            // setAuth(response2.data);
            // console.log(response2.data);
            // setUsername("");
            // setPassword("");
            // setUser(data.username);
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
                    <div className="form-input-wrapper">
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
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>

                    <button data-testid="login-btn">Sign In</button>
                </form>
                <p>
                    Need an Account?
                    <br />
                    <Link to="/signup" style={{ textDecoration: "underline", color: "white" }}>
                        Sign Up
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default Login;
