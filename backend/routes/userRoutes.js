import express from "express";
import {
  authUser,
  followUser,
  getUserById,
  logoutUser,
  registerUser,
  searchUser,
  unfollowUser,
  updateProfileUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/getUser/:id", protect, getUserById);
router.get("/search/getUser", protect, searchUser);
router.post("/followUser", protect, followUser);
router.post("/unfollowUser", protect, unfollowUser);
router.put("/profile", protect, updateProfileUser);

export default router;
