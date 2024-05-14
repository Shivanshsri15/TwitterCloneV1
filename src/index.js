import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import UserLogin from "./screens/UserLogin";
import PrivateRoute from "./components/PrivateRoute";
import MainHomeScreen from "./screens/MainHomeScreen";
import PostTagScreen from "./screens/PostTagScreen";
import TagNamePostsScreen from "./screens/TagNamePostsScreen";
import FollwingPostsScreen from "./screens/FollwingPostsScreen";
import SearchUserScreen from "./screens/SearchUserScreen";
import UserDataScreen from "./screens/UserDataScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
// import TagPostScreen from "./screens/TagPostScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/login" element={<UserLogin />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<MainHomeScreen />} />
        <Route path="/tags/:tagTitle/:tagId" element={<PostTagScreen />} />
        <Route path="/tags/:tagName" element={<TagNamePostsScreen />} />
        <Route path="/home/FollowingPosts" element={<FollwingPostsScreen />} />
        <Route path="/home/searchUser" element={<SearchUserScreen />} />

        <Route
          path="/home/searchUser/:keyword"
          element={<SearchUserScreen />}
        />
      </Route>
      <Route path="/home/:userFirstName/:userId" element={<UserDataScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/profile/:userId" element={<UserProfileScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
