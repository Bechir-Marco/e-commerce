import User from '../models/UserModel'
import {hashPassword, comparePasswords} from '../utils/hashPassword'
import generateAuthToken from '../utils/generateAuthToken'


export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        return res.json(users);
    } catch (err) {
        next(err);
    }
};
export const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body;
        if (!(name && lastName && email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send("user exists");
        } else {
            const hashedPassword = hashPassword(password);
            console.log(hashedPassword);
            const user = await User.create({
                name,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
            });
            res
                .cookie(
                    "access_token",
                    generateAuthToken(
                        user._id,
                        user.name,
                        user.lastName,
                        user.email,
                        user.isAdmin
                    ),
                    {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                    }
                )
                .status(201)
                .json({
                    success: "User created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                });
        }
    } catch (err) {
        next(err);
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { email, password, doNotLogout } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const user = await User.findOne({ email }).orFail();
        if (user && comparePasswords(password, user.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: undefined
            };

            if (doNotLogout) {
                if (doNotLogout) {
                   
                    cookieParams = { ...cookieParams, maxAge: 60 * 60 * 24 * 7 };
                }
            }

            return res
                .cookie(
                    "access_token",
                    generateAuthToken(
                        user._id,
                        user.name,
                        user.lastName,
                        user.email,
                        user.isAdmin
                    ),
                    cookieParams
                )
                .json({
                    success: "user logged in",
                    userLoggedIn: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        doNotLogout,
                    },
                });
        } else {
            return res.status(401).send("wrong credentials");
        }
    } catch (err) {
        next(err);
    }
};