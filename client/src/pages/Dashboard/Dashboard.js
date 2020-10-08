import React, { useState, useEffect } from "react";
import axios from "axios";

// redux
import { connect } from "react-redux";
import { setUser, logoutUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

// loading component
import Loading from "../../components/Loading/Loading";

function Dashboard(props) {
    const getUserData = async () => {
        const token = localStorage.getItem("myToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        }

        try {
            const response = await axios.get(
                "http://192.168.1.221:7000/api/task/todos"
            );
            props.setUser(response.data.user);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const logout = () => {
        props.logoutUser();
        props.history.push("/signin");
    };

    return (
        <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            className="dashboard"
        >
            {/* <Loading /> */}
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </motion.div>
    );
}

const mapStateToProps = (state) => ({
    user: state,
});

const mapActionsToProps = {
    setUser,
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
