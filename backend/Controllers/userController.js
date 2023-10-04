const User = require('../models/UserModel.js');
const generateToken = require('../config/generateToken.js');

// Call Back Function for sign up of the user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist");
    }
    const username = email.substring(0, email.indexOf('@gmail.com'));
    const user = await User.create({
        name,
        username,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: await generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Faild to create the User");
    }
}

// Call Back Function to login functionalities
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            pic: user.pic,
            token: await generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Faild to access the User");
    }
}

// Call Back Function to search user by username and name address
const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
        ],
    } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }).select("-password -friends");
    res.send(users);
}

module.exports = { registerUser, authUser, allUsers };