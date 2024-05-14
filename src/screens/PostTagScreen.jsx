import React from "react";
import { useGetTagPostsQuery } from "../slices/postApiSlice";
import Loader from "../components/Loader";
import HomeScreen from "./HomeScreen";
import { useParams } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

const PostTagScreen = () => {
  const { tagId } = useParams();
  const { data, isLoading } = useGetTagPostsQuery(tagId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };
  return (
    <HomeScreen>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-2 text-primary">#{data.tagTitle}</h1>

          {data.tagPosts.map((p) => (
            <div className=" rounded my-3 p-3 shadow-lg ms-3">
              <strong className="m-2">
                <span className="fs-5 my-2">{p.postText} </span>
              </strong>
              <span> ({formatDate(p.createdAt)})</span>
              {p.postImages.length !== 0 ? (
                <Carousel interval={null} className="mt-3">
                  {p.postImages.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        src={`/${image}`}
                        fluid
                        style={{ height: "100%" }}
                        className="rounded"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <></>
              )}
              <hr />
            </div>
          ))}
        </>
      )}
    </HomeScreen>
  );
};

export default PostTagScreen;
