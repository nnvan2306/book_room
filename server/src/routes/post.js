import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);
router.get("/detail/:id", postController.getOne);
router.delete("/:id", postController.deletePost);
router.put("/update", postController.updatePost);

router.use(verifyToken);
router.post("/create-new", postController.createNewPosts);
router.get("/limit-admin", postController.getPostsLimitAdmin);

export default router;
