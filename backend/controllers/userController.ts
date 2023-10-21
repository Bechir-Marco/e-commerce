import User from '../models/UserModel'
import Review from '../models/ReviewModel'
import Product from '../models/ProductModel'
import {hashPassword, comparePasswords} from '../utils/hashPassword'
import generateAuthToken from '../utils/generateAuthToken'
import { ObjectId } from 'mongodb';


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
                        // secure: process.env.NODE_ENV === "production",
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
                // secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 *3* 1000 
            };
            
            
                if (doNotLogout) {
                   
                    cookieParams = {
                        ...cookieParams, maxAge: 24 * 60 * 60 * 7 * 1000 };
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
export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password);
        }
        await user.save();

        res.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        next(err);
    }
};
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        return res.send(user);
    } catch (err) {
        next(err);
    }
};





export const writeReview = async (req, res, next) => {
    type User = {
        _id: string;
        email?: string;
        name?: string;
        lastName?: string;
    };

    // Define a type for the review object
    type Review = {
        _id: ObjectId;
        
        comment: string;
        rating: number;
        user: User;
    };

    const session = await Review.startSession();
    try {
        const { comment, rating } = req.body;

        // Validate request:
        if (!(comment && rating)) {
            return res.status(400).send("All inputs are required");
        }
        const reviewId = new ObjectId();

        session.startTransaction();
        const newReview: Review = {
            _id: reviewId,
            comment: comment,
            rating: Number(rating),
            user: {
                _id: req.user._id,
                name: req.user.name,
                lastName : req.user.lastName,
                
            },
        };
       
        await Review.create([newReview]);
       
        const product = await Product.findById(req.params.productId)
            .populate({
                path: 'reviews',
                model: 'Review',
                
            })
            .session(session);

          
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usersIdThatMadeReview = product.reviews.map((review: any) => review.user);

        const userIDs = usersIdThatMadeReview
            .filter((objectId) => objectId !== undefined) 
            .map((objectId) => objectId.toString()); 

       

        if (userIDs.includes(req.user._id.toString())) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send("Product already reviewed");
        }

        product.reviews.push(reviewId);
        const reviews = await Review.find({ _id: { $in: product.reviews } });
        const totalRating = reviews.reduce((sum, item) => sum + (Number(item.rating)), 0);
        product.reviewsNumber = reviews.length;
        product.rating = Math.round(totalRating / product.reviewsNumber);

        await product.save();
        await session.commitTransaction();
        session.endSession();
        res.send('Review created');
    } catch (err) {
        await session.abortTransaction();
        next(err);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail();
        return res.send(user);
    } catch (err) {
        next(err);
    }
};

 export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();

        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        await user.save();

        res.send("user updated");

    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail();
        await user.deleteOne();
        res.send("user removed");
    } catch (err) {
        next(err);
    }
};