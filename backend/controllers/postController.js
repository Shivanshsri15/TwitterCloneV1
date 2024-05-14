import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/postModel.js";
import Tags from "../models/tagModel.js";
import User from "../models/userModel.js";

// @desc Create new post
// @route POST /api/posts
// @access Private

const addPost = asyncHandler(async (req, res, next) => {
  if (!req.body.tagTitle) {
    const { postText, postImages } = req.body;

    const post = new Post({
      user: req.user._id,
      postText,
      postImages,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } else {
    const { postText, tagTitle, postImages } = req.body;
    const post = new Post({
      user: req.user._id,
      postText,
      postImages,
      tags: tagTitle,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);

    try {
      tagTitle.forEach(async (x, index) => {
        const tagExist = await Tags.findOne({ tagTitle: x });
        if (tagExist) {
          await tagExist.updateOne({ $push: { tagPosts: createdPost } });
        } else {
          const tagPost = new Tags({
            tagTitle: x,
            tagPosts: { ...createdPost },
          });
          await tagPost.save();
        }
      });
      res.status(201).json("TagPosts completed");
    } catch (error) {
      console.log(error);
    }
  }
});

// @desc Get all posts
// @route Get /api/posts/forYouPosts
// @access Private

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user", "-password");
  res.status(201).json(posts);
});

// @desc Get all Tags
// @route Get /api/posts/getAllPostTags
// @access Private

const getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tags.find({}).sort({ tagPosts: 1 });
  res.status(201).json(tags);
});
// @desc Get Tag Posts
// @route Get /api/posts/getAllPostTags/:tagId
// @access Private

const getTagPosts = asyncHandler(async (req, res) => {
  const tags = await Tags.findById(req.params.tagId).populate({
    path: "tagPosts.user",
    select: "-password",
  });

  res.status(201).json(tags);
});
// @desc Get Tag Posts on tagNames
// @route Get /api/posts/getTagPosts/:tagName
// @access Private
const getTagPostsOnName = asyncHandler(async (req, res) => {
  const tags = await Tags.findOne({ tagTitle: req.body.tagName }); // use tagTitle field instead of _id
  if (tags) {
    res.status(201).json(tags);
  } else {
    res.status(404).json("Tag Doesn't Exists");
  }
});

// @desc Like posts
// @route Get /api/posts/forYouPostsLike
// @access Private

const likePosts = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findOne({ _id: postId });
  if (post?.postLikes.includes(req.user._id)) {
    await post.updateOne({ $pull: { postLikes: req.user._id } });
    res.status(201).json({ message: "Post UnLiked" });
  } else {
    await post.updateOne({ $push: { postLikes: req.user._id } });
    res.status(201).json({ message: "Post Liked" });
  }
});

// @desc add comments
// @route Get /api/posts/addComments
// @access Private

const addComment = asyncHandler(async (req, res) => {
  const { commentId, commentText, commentName } = req.body;
  const commentPost = await Post.findOne({ _id: commentId });
  const comment = {
    commentName,
    commentText,
    user: req.user._id,
  };
  await commentPost.comment.push(comment);

  await commentPost.save();
  res.status(200).json("Comment Posted Success");
});

// @desc get comments
// @route Get /api/posts/getComments
// @access Private

const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findOne({ _id: postId });
  const populatedComments = await post.populate("comment.user", "-password");
  res.status(201).json(populatedComments);
});

// @desc get following users posts
// @route Get /api/posts/getFollowingPosts
// @access Private
const getFollowingPosts = asyncHandler(async (req, res) => {
  // Find the logged-in user
  const currentUser = await User.findById(req.user._id); // Assuming you have user ID stored in req.user.id

  // Get the IDs of users that the logged-in user follows
  const followingIds = currentUser.followings;

  // Find posts created by the users the logged-in user follows
  const followingPosts = await Post.find({
    user: { $in: followingIds },
  }).populate("user", "-password"); // Assuming the user field in Post schema refers to the user who created the post
  if (followingPosts) {
    res.status(201).json(followingPosts);
  } else {
    res.status(404).json("User is not following anyone");
  }
});

// @desc get user Posts
// @route Get /api/posts/getUserPosts/:id
// @access Private
const getUserPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({ user: req.params.id }).populate(
    "user",
    "-password"
  );
  res.status(201).json(post);
});

export {
  addPost,
  getAllPosts,
  getAllTags,
  likePosts,
  addComment,
  getPostComments,
  getTagPosts,
  getTagPostsOnName,
  getFollowingPosts,
  getUserPosts,
};
