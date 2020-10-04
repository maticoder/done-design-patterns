import React from "react";

// react router imports
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";

// import framer presence to page transition
import { motion, AnimatePresence } from "framer-motion";

// mui imports
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// import navbar
import Navbar from "./components/Navbar/Navbar";

// import pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import "./App.css";

// create mui theme
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FC569A",
        },
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif;",
    },
});

function App() {
    const location = useLocation();

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <Navbar />
                <AnimatePresence exitBeforeEnter={true}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/" component={Home} />
                        <Route path="/signin" component={Login} />
                        <Route path="/signup" component={Register} />
                    </Switch>
                </AnimatePresence>
            </ThemeProvider>
        </div>
    );
}

export default App;
