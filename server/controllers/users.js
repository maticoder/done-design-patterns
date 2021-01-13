const {
  validateSigninData,
  validateSignupData,
} = require("../util/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Data = require("../models/Data");
const { Factory } = require("../factory/Factory");
const { Iterator } = require("../iterator/Iterator");
const Project = require("../models/Project");
const { ProjectCache } = require("../prototype/Prototype");
const CreateProject = require("../chainOfResponsibility/ChainOfResponsibility.js");
const { Singleton } = require("../singleton/Singleton");

ProjectCache.loadCache();

// register
module.exports.signup = async (req, res) => {
  // get the user data from req body
  const { username, email, password, confirmPassword } = req.body;

  const UserSingleton = Singleton;

  const factory = new Factory();

  // create new user data
  const newUser = factory.get("USER", {
    username,
    email,
    password,
    confirmPassword,
  });

  // check if the user data is valid
  const { errors, valid } = validateSignupData(newUser);

  // if the data provided by the user is invalid, return errors
  if (!valid) {
    return res.status(400).json(errors);
  }

  // if the data provided by the user is valid, register the user and save in the database

  // check if the user is already in the databse
  try {
    let user = null;
    let users = await UserSingleton.getInstance().find();
    let iterator = new Iterator(users);
    for (
      let item = iterator.first();
      iterator.hasNext();
      item = iterator.next()
    ) {
      if (item.username === newUser.username || item.email === newUser.email) {
        user = item;
      }
    }

    // if the user exists return error
    if (user) {
      return res.status(400).json({
        username: "User exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    // create new user
    user = await UserSingleton.getInstance().create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword,
    });

    // create data for user
    const data = await Data.create({
      user: user._id,
    });

    const createProject = new CreateProject(data);
    await (
      await (await createProject.create(ProjectCache.getProject("1"))).create(
        ProjectCache.getProject("2")
      )
    ).create(ProjectCache.getProject("3"));

    data.save();

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
      general: "Something went wrong",
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
        email: "User does not exist",
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
        password: "Password is not correct",
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
