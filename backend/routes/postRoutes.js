import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  addPost,
  getAllPosts,
  getAllTags,
  getFollowingPosts,
  getPostComments,
  getTagPosts,
  getTagPostsOnName,
  getUserPosts,
  likePosts,
} from "../controllers/postController.js";

router.route("/").post(protect, addPost);
router.route("/forYouPosts").get(protect, getAllPosts);
router.route("/forYouPostsLike").post(protect, likePosts);
router.route("/addComments").post(protect, addComment);
router.route("/getPostComments").post(protect, getPostComments);
router.route("/getAllPostTags").get(protect, getAllTags);
router.route("/getTagPosts/:tagId").get(protect, getTagPosts);
router.route("/getTagPostsByName").post(protect, getTagPostsOnName);
router.route("/getFollowingPosts").get(protect, getFollowingPosts);
router.get("/getUserPosts/:id", protect, getUserPosts);

export default router;
