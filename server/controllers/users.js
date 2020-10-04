const { validateSignupData } = require("../util/validation");

// register user
module.exports.signup = (req, res) => {
    // get the user data from req body
    const { username, email, password, confirmPassword } = req.body;

    // create new user data
    const newUser = {
        username,
        email,
        password,
        confirmPassword,
    };

    // check if the user data is valid
    const { errors, valid } = validateSignupData(newUser);

    // if the data provided by the user is invalid, return errors
    if (!valid) {
        return res.status(400).json(errors);
    }

    // if the data provided by the user is valid, register the user and save in the database

    return res.json("Everything's good");
};
