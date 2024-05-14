import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import { useGetTagPostsByNameMutation } from "../slices/postApiSlice";
import { toast } from "react-toastify";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const TagNamePostsScreen = () => {
  const { tagName } = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [getTagPostsByName] = useGetTagPostsByNameMutation();
  const [tagPostsData, setTagPostsData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const res = await getTagPostsByName({ tagName });
        setTagPostsData(res.data);
        setLoadingData(false);
        console.log(res.data);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };
  return (
    <HomeScreen>
      {loadingData && <Loader />}
      <>
        <h1 className="my-2 text-primary">#{tagPostsData?.tagTitle}</h1>
        <hr />
        {tagPostsData?.tagPosts.map((p) => (
          <div className="border border-light rounded my-3 p-3 shadow-lg ms3">
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
          </div>
        ))}
      </>
    </HomeScreen>
  );
};

export default TagNamePostsScreen;
