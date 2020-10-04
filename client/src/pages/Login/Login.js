import React from "react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { ReactComponent as LoginImage } from "../../images/login.svg";

// facebook icon
import FacebookIcon from "@material-ui/icons/Facebook";

// import styles
import "./Login.css";

import { indigo } from "@material-ui/core/colors";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
        "&:hover": {
            backgroundColor: indigo[700],
        },
    },
}))(Button);

function Login() {
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
                        <form action="">
                            <div className="input">
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="">Password</label>
                                <input type="text" />
                            </div>
                            <div className="input forgot">
                                <p>
                                    Forgot password? <Link>Click here</Link>
                                </p>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Sign in
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

export default Login;
