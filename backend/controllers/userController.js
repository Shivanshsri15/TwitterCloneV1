import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../util/generateToken.js";

// @DESC    Auth user and get Token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      profileImage: user.profileImage,
      age: user.age,
      followers: user.followers,
      followings: user.followings,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @DESC    register user and get Token
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, surname, email, password, age } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    surname,
    email,
    password,
    age,
    profileImage: "/images/profileImage.jpg",
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      age: user.age,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @DESC    logout User / clear cookie
// @route   POST /api/users/logout
// @access  private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out successfully" });
});

// @DESC    follow User
// @route   POST /api/users/follow/:id
// @access  private

const followUser = asyncHandler(async (req, res) => {
  const userYouWantToFollow = await User.findById(req.body.id);
  const userLoggedIn = await User.findById(req.user._id);
  if (!userLoggedIn.followings.includes(userYouWantToFollow._id)) {
    await userYouWantToFollow.updateOne({ $push: { followers: req.user._id } });
    await userLoggedIn.updateOne({
      $push: { followings: userYouWantToFollow._id },
    });
    res.status(201).json("User Followed Successfully");
  } else {
    res.status(404).json("User is already followed by you ");
  }
});

// @DESC    unfollow User
// @route   POST /api/users/unfollow/:id
// @access  private

const unfollowUser = asyncHandler(async (req, res) => {
  const userYouWantToUnFollow = await User.findById(req.body.id);
  const userLoggedIn = await User.findById(req.user._id);
  if (userLoggedIn.followings.includes(userYouWantToUnFollow._id)) {
    await userYouWantToUnFollow.updateOne({
      $pull: { followers: req.user._id },
    });
    await userLoggedIn.updateOne({
      $pull: { followings: userYouWantToUnFollow._id },
    });
    res.status(201).json("User UnFollowed Successfully");
  } else {
    res.status(404).json("User is already Unfollowed by you ");
  }
});

// @DESC    get User by Id
// @route   POST /api/users/getUser/:id
// @access  private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(201).json(user);
});

// @DESC    get User by Search
// @route   POST /api/users/search/getUser
// @access  private
const searchUser = asyncHandler(async (req, res) => {
  const searchText = req.query.keyword;

  const users = await User.find({
    firstName: { $regex: new RegExp(searchText, "i") },
  });

  res.status(201).json(users);
});

// @DESC    Update user profile
// @route   PUT /api/users/profile
// @access  Private/

const updateProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.profileImage = req.body.profileImage || user.profileImage;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      surname: updatedUser.surname,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      age: updatedUser.age,
      followers: updatedUser.followers,
      followings: updatedUser.followings,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  followUser,
  unfollowUser,
  getUserById,
  searchUser,
  updateProfileUser,
};
