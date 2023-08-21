import express from 'express';
const router = express.Router()

router.get("/", (req,res) => {
    res.send("Handling product routes, e.g. search for products")
})

export default router;
