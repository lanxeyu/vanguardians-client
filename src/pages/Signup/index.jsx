import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
    // Allows focus to be set on userInput when component loads
    const userRef = useRef();
    // Allows focus to be set on error for screen reader to announce
    const errRef = useRef();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidName(result);
    }, [username]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [username, password, matchPwd]);

    useEffect(() => {
        if (!success) {
            if (validName) {
                document.querySelector("#userNameCheck svg path").classList.add("valid");
            } else {
                console.log(document.querySelector("#userNameCross svg path"));
                document.querySelector("#userNameCross svg path").classList.add("invalid");
            }
        }
    }, [validName]);

    useEffect(() => {
        if (!success) {
            if (validPwd) {
                document.querySelector("#pwdCheck svg path").classList.add("valid");
            } else {
                document.querySelector("#pwdCross svg path").classList.add("invalid");
            }
        }
    }, [validPwd]);

    useEffect(() => {
        if (!success) {
            if (validMatch && matchPwd) {
                document.querySelector("#matchCheck svg path").classList.add("valid");
            } else {
                document.querySelector("#matchCross svg path").classList.add("invalid");
            }
        }
    }, [validPwd, validMatch]);

    const handleSubmit = async e => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        console.log(JSON.stringify({ username, password }));

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/register",
                JSON.stringify({ username, password }),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log(JSON.stringify(response?.data));

            navigate("/login");
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUsername("");
            setPassword("");
            setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <section className="registerForm">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <h1 className="register">Register</h1>
                <form id="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <span id="userNameCheck" className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                            id="userNameCross"
                            className={validName || !username ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={e => setUsername(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        id="uidnote"
                        className={
                            userFocus && username && !validName ? "instructions" : "offscreen"
                        }>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="password">
                        Password:
                        <span id="pwdCheck" className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span id="pwdCross" className={validPwd || !password ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        id="pwdnote"
                        className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number and a special
                        character.
                        <br />
                        Allowed special characters: <span aria-label="exclamation mark">
                            !
                        </span>{" "}
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span id="matchCheck" className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                            id="matchCross"
                            className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={e => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id="confirmnote"
                        className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <button
                        data-testid="reg-btn"
                        disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign Up
                    </button>
                </form>
                <p>
                    Already registered? <br />
                    <Link to="/login" style={{ textDecoration: "underline", color: "#237a20" }}>
                        Login
                    </Link>
                </p>
            </section>
        </>
    );
};

export default Signup;
