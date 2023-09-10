import express from 'express';
const router = express.Router();
import {
    getUsers, registerUser, loginUser
    // , getUser, updateUser, deleteUser
} from '../controllers/userController';
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/:id", getUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);
export default router;