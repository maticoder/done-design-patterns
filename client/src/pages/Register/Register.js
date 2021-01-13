import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// import axios
import axios from "axios";

// import image
import { ReactComponent as RegisterImage } from "../../images/register.svg";

import "./Register.css";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";

import Observable from "../../util/Observable";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            agree: false,
            loading: false,
            errors: {},
            usernameError: null,
            emailError: null,
            passwordError: null,
            confirmPasswordError: null,
        };
        this.observer = new Observable();
    }

    componentDidMount() {
        this.observer.subscribe(this.handleUsernameChange);
        this.observer.subscribe(this.handleEmailChange);
        this.observer.subscribe(this.handlePasswordChange);
        this.observer.subscribe(this.handleConfirmPasswordChange);
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => {
                this.observer.notify(this.state);
            }
        );
    };

    handleUsernameChange = (state) => {
        if (state.username === "") {
            this.setState({
                errors: {},
                usernameError: "name must not be empty",
            });
        } else if (state.username.length < 4) {
            this.setState({
                errors: {},
                usernameError: "name must be at least 4 characters long",
            });
        } else {
            this.setState({
                errors: {},
                usernameError: null,
            });
        }
    };

    handleEmailChange = (state) => {
        if (state.email === "") {
            this.setState({
                errors: {},
                emailError: "emial must not be empty",
            });
        } else if (
            !state.email.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            this.setState({
                errors: {},
                emailError: "must be a valid email",
            });
        } else {
            this.setState({
                errors: {},
                emailError: null,
            });
        }
    };

    handlePasswordChange = (state) => {
        if (state.password === "") {
            this.setState({
                errors: {},
                passwordError: "password must not be empty",
            });
        } else if (state.password.length < 6) {
            this.setState({
                errors: {},
                passwordError: "password must be at least 6 characters long",
            });
        } else {
            this.setState({
                errors: {},
                passwordError: null,
            });
        }
    };

    handleConfirmPasswordChange = (state) => {
        if (state.confirmPassword === "") {
            this.setState({
                errors: {},
                confirmPasswordError: "password must not be empty",
            });
        } else if (state.password !== state.confirmPassword) {
            this.setState({
                errors: {},
                confirmPasswordError: "passwords must match",
            });
        } else {
            this.setState({
                errors: {},
                confirmPasswordError: null,
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        // set loading
        this.setState({
            loading: true,
        });

        // make axios request
        try {
            const response = await axios.post(
                "http://192.168.0.185:7000/api/user/signup",
                {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                },
                {
                    headers: {},
                }
            );
            this.setState({
                loading: false,
                errors: {},
            });

            // login user and redirect
            console.log(response);
            this.props.loginUser(response.data);
            this.props.history.push("/dashboard");
        } catch (err) {
            this.setState({
                loading: false,
                errors: err.response.data,
            });
        }
    };

    render() {
        const {
            username,
            email,
            password,
            confirmPassword,
            agree,
            loading,
            errors,
            usernameError,
            emailError,
            passwordError,
            confirmPasswordError,
        } = this.state;

        return (
            <div id="register">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="register container"
                >
                    <motion.div variants={itemOne} className="top">
                        <div className="content">
                            <h1>Sign up</h1>
                            <p>Start your journey right now</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input">
                                    <label htmlFor="">
                                        <span
                                            className={
                                                (usernameError ||
                                                    errors.username) &&
                                                "label-error"
                                            }
                                        >
                                            Username
                                        </span>
                                        {(usernameError || errors.username) && (
                                            <span className="error">
                                                {usernameError ||
                                                    errors.username}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        name="username"
                                        className={
                                            (usernameError ||
                                                errors.username) &&
                                            "input-error"
                                        }
                                        value={username}
                                        onChange={this.handleChange}
                                        type="text"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">
                                        <span
                                            className={
                                                (emailError || errors.email) &&
                                                "label-error"
                                            }
                                        >
                                            Email
                                        </span>
                                        {(emailError || errors.email) && (
                                            <span className="error">
                                                {emailError || errors.email}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        name="email"
                                        className={
                                            (emailError || errors.email) &&
                                            "input-error"
                                        }
                                        value={email}
                                        onChange={this.handleChange}
                                        type="email"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">
                                        <span
                                            className={
                                                (passwordError ||
                                                    errors.password) &&
                                                "label-error"
                                            }
                                        >
                                            Password
                                        </span>
                                        {(passwordError || errors.password) && (
                                            <span className="error">
                                                {passwordError ||
                                                    errors.password}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        name="password"
                                        className={
                                            (passwordError ||
                                                errors.password) &&
                                            "input-error"
                                        }
                                        value={password}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="">
                                        <span
                                            className={
                                                (confirmPasswordError ||
                                                    errors.confirmPassword) &&
                                                "label-error"
                                            }
                                        >
                                            Confirm password
                                        </span>
                                        {(confirmPasswordError ||
                                            errors.confirmPassword) && (
                                            <span className="error">
                                                {confirmPasswordError ||
                                                    errors.confirmPassword}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        name="confirmPassword"
                                        className={
                                            (confirmPasswordError ||
                                                errors.confirmPassword) &&
                                            "input-error"
                                        }
                                        value={confirmPassword}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </div>
                                <div className="input check">
                                    <Checkbox
                                        checked={agree}
                                        onChange={() =>
                                            this.setState({
                                                agree: !agree,
                                            })
                                        }
                                        inputProps={{
                                            "aria-label": "primary checkbox",
                                        }}
                                    />
                                    <p>
                                        I agree to the{" "}
                                        <Link to="/privacy">
                                            Privacy Policy
                                        </Link>
                                    </p>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {!loading ? (
                                        "Start now"
                                    ) : (
                                        <React.Fragment>
                                            <span
                                                style={{ visibility: "hidden" }}
                                            >
                                                I
                                            </span>
                                            <CircularProgress
                                                color="inherit"
                                                size={22}
                                            />
                                        </React.Fragment>
                                    )}
                                </Button>
                            </form>
                            <p className="account">
                                Already have an account?{" "}
                                <Link to="/signin">Sign in</Link>
                            </p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemTwo} className="bottom">
                        <div className="img-container">
                            <RegisterImage />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

/*
function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // set loading
        setLoading(true);

        // make axios request
        try {
            const response = await axios.post(
                "http://192.168.0.185:7000/api/user/signup",
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                },
                {
                    headers: {},
                }
            );
            setLoading(false);
            setErrors({});

            // login user and redirect
            props.loginUser(response.data);
            props.history.push("/dashboard");
        } catch (err) {
            setLoading(false);
            setErrors(err.response.data);
        }
    };

    return (
        <div id="register">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="register container"
            >
                <motion.div variants={itemOne} className="top">
                    <div className="content">
                        <h1>Sign up</h1>
                        <p>Start your journey right now</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input">
                                <label htmlFor="">
                                    <span
                                        className={
                                            errors.username && "label-error"
                                        }
                                    >
                                        Username
                                    </span>
                                    {errors.username && (
                                        <span className="error">
                                            {errors.username}
                                        </span>
                                    )}
                                </label>
                                <input
                                    className={errors.username && "input-error"}
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    type="text"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="">
                                    <span
                                        className={
                                            errors.email && "label-error"
                                        }
                                    >
                                        Email
                                    </span>
                                    {errors.email && (
                                        <span className="error">
                                            {errors.email}
                                        </span>
                                    )}
                                </label>
                                <input
                                    className={errors.email && "input-error"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="">
                                    <span
                                        className={
                                            errors.password && "label-error"
                                        }
                                    >
                                        Password
                                    </span>
                                    {errors.password && (
                                        <span className="error">
                                            {errors.password}
                                        </span>
                                    )}
                                </label>
                                <input
                                    className={errors.password && "input-error"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="">
                                    <span
                                        className={
                                            errors.confirmPassword &&
                                            "label-error"
                                        }
                                    >
                                        Confirm password
                                    </span>
                                    {errors.confirmPassword && (
                                        <span className="error">
                                            {errors.confirmPassword}
                                        </span>
                                    )}
                                </label>
                                <input
                                    className={
                                        errors.confirmPassword && "input-error"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    type="password"
                                />
                            </div>
                            <div className="input check">
                                <Checkbox
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                                <p>
                                    I agree to the{" "}
                                    <Link to="/privacy">Privacy Policy</Link>
                                </p>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                disabled={loading}
                            >
                                {!loading ? (
                                    "Start now"
                                ) : (
                                    <React.Fragment>
                                        <span style={{ visibility: "hidden" }}>
                                            I
                                        </span>
                                        <CircularProgress
                                            color="inherit"
                                            size={22}
                                        />
                                    </React.Fragment>
                                )}
                            </Button>
                        </form>
                        <p className="account">
                            Already have an account?{" "}
                            <Link to="/signin">Sign in</Link>
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemTwo} className="bottom">
                    <div className="img-container">
                        <RegisterImage />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
*/

const mapStateToProps = (state) => ({
    user: state,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
