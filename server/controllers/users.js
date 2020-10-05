const {
    validateSigninData,
    validateSignupData,
} = require("../util/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// register
module.exports.signup = async (req, res) => {
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

    // check if the user is already in the databse
    try {
        let user = await User.findOne({
            $or: [
                {
                    username: newUser.username,
                },
                {
                    email: newUser.email,
                },
            ],
        });

        // if the user exists return error
        if (user) {
            return res.status(400).json({
                general: "User with given credentials exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        // create new user
        user = await User.create({
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword,
        });

        // sign in the user and return the token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.SECRET
        );

        // return the token
        return res.json(token);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            general: "something went wrong",
        });
    }
};

// login
module.exports.signin = async (req, res) => {
    // get the user data from req body
    const { email, password } = req.body;

    // store user data
    const userData = {
        email,
        password,
    };

    // check if the user data is valid
    const { errors, valid } = validateSigninData(userData);

    // if the data provided by the user is invalid, return errors
    if (!valid) {
        return res.status(400).json(errors);
    }

    // if the data provided by the user is valid, login the user and return token

    // check if the user is already in the databse
    try {
        let user = await User.findOne({
            email,
        });

        // if the user with given email doesn't exist return error
        if (!user) {
            return res.status(400).json({
                general: "User with given email does not exist",
            });
        }

        // if the user exists compare hashed passwords
        const validPasswods = await bcrypt.compare(
            userData.password,
            user.password
        );

        // if passwords is invalid return error
        if (!validPasswods) {
            return res.status(400).json({
                general: "Password is not correct",
            });
        }

        // create and assign token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.SECRET
        );

        // return token
        return res.json(token);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            general: "something went wrong",
        });
    }
};
