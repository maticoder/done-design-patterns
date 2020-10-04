import React from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// import image
import { ReactComponent as RegisterImage } from "../../images/register.svg";

import "./Register.css";

// import animations
import { container, itemOne, itemTwo } from "../../util/animation";

function Register() {
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
                        <form>
                            <div className="input">
                                <label htmlFor="">Username</label>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="">Password</label>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="">Confirm password</label>
                                <input type="text" />
                            </div>
                            <div className="input check">
                                <Checkbox
                                    // checked={checked}
                                    // onChange={handleChange}
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                                <p>
                                    I agree to the <Link>Privacy Policy</Link>
                                </p>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Start now
                            </Button>
                        </form>
                        <p className="account">
                            Already have an account?{" "}
                            <Link to="signin">Sign in</Link>
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

export default Register;
