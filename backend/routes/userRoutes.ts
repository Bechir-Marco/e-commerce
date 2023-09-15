import express from 'express';
const router = express.Router();
import { verifyIsLoggedIn, verifyIsAdmin } from '../middleWare/verifyAuthToken';
import {
    getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview,
     getUser, updateUser, deleteUser
} from '../controllers/userController';

router.post("/register", registerUser);
router.post("/login", loginUser);

/*********** User Logged In Routes  */
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.get('/profile/:id', getUserProfile);
router.post('/review/:productId', writeReview);

/*********** Admin Routes  */
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;