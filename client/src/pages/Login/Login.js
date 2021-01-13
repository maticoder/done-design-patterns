import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// import axios
import axios from "axios";

import { ReactComponent as LoginImage } from "../../images/login.svg";

// facebook icon
import FacebookIcon from "@material-ui/icons/Facebook";

// import styles
import "./Login.css";

import { indigo } from "@material-ui/core/colors";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";
import Observable from "../../util/Observable";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
        "&:hover": {
            backgroundColor: indigo[700],
        },
    },
}))(Button);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {},
            emailError: null,
            passwordError: null,
        };
        this.observer = new Observable();
    }

    componentDidMount() {
        this.observer.subscribe(this.handleEmailChange);
        this.observer.subscribe(this.handlePasswordChange);
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
        } else {
            this.setState({
                errors: {},
                passwordError: null,
            });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        try {
            const response = await axios.post(
                "http://192.168.0.185:7000/api/user/signin",
                {
                    email: this.state.email,
                    password: this.state.password,
                },
                {
                    headers: {},
                }
            );
            this.setState({
                loading: false,
                errors: false,
            });

            // login user and redirect
            this.props.loginUser(response.data);
            this.props.history.push("/dashboard");
        } catch (err) {
            this.setState({
                loading: false,
            });
            if (err.response && err.response.data) {
                this.setState({
                    errors: err.response.data,
                });
            }
        }
    };

    render() {
        const {
            email,
            password,
            loading,
            errors,
            emailError,
            passwordError,
        } = this.state;

        return (
            <div id="login">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="login container"
                >
                    <motion.div variants={itemOne} className="top">
                        <div className="content">
                            <h1>Sign in</h1>
                            <p>Complete every task</p>
                            <ColorButton
                                className="google-button"
                                variant="contained"
                                startIcon={<FacebookIcon />}
                                fullWidth
                            >
                                Sign in with Facebook
                            </ColorButton>
                            <div className="divider">
                                <p>OR</p>
                                <div className="line"></div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
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
                                <div className="input forgot">
                                    <p>
                                        Forgot password?{" "}
                                        <Link to="/forgot">Click here</Link>
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
                                        "Sign in"
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
                                Doesn't have an account?{" "}
                                <Link to="/signup">Sign up</Link>
                            </p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemTwo} className="bottom">
                        <div className="img-container">
                            <LoginImage />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
}

/*
function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // set loading
        setLoading(true);

        try {
            const response = await axios.post(
                "http://192.168.0.185:7000/api/user/signin",
                {
                    email,
                    password,
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
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            }
        }
    };

    return (
        <div id="login">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="login container"
            >
                <motion.div variants={itemOne} className="top">
                    <div className="content">
                        <h1>Sign in</h1>
                        <p>Complete every task</p>
                        <ColorButton
                            className="google-button"
                            variant="contained"
                            startIcon={<FacebookIcon />}
                            fullWidth
                        >
                            Sign in with Facebook
                        </ColorButton>
                        <div className="divider">
                            <p>OR</p>
                            <div className="line"></div>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                            <div className="input forgot">
                                <p>
                                    Forgot password?{" "}
                                    <Link to="/forgot">Click here</Link>
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
                                    "Sign in"
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
                            Doesn't have an account?{" "}
                            <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemTwo} className="bottom">
                    <div className="img-container">
                        <LoginImage />
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

export default connect(mapStateToProps, mapActionsToProps)(Login);
