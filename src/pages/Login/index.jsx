import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async e => {
        e.preventDefault();

        console.log(user, pwd);
        setUser("");
        setPwd("");
        setSuccess(true);
    };

    return (
        <>
            {success ? (
                <section className="loginForm">
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className="loginForm">
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">
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
                            onChange={e => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?
                        <br />
                        <Link
                            to="/signup"
                            style={{ textDecoration: "underline", color: "#237a20" }}>
                            Sign Up
                        </Link>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
