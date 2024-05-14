// import React from "react";
// import HomeScreen from "./HomeScreen";
// import { useGetTagPostsQuery } from "../slices/postApiSlice";
// import Loader from "../components/Loader";

// const tagPostScreen = () => {
//   const { tagId } = useParams();
//   const { data, isLoading } = useGetTagPostsQuery(tagId);
//   return (
//     <HomeScreen>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <h1>{tagPostsData.tagTitle}</h1>
//         </>
//       )}
//     </HomeScreen>
//   );
// };

// export default tagPostScreen;
