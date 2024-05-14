import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import HomeScreen from "./HomeScreen";
import {
  Row,
  Col,
  Container,
  Image,
  Form,
  Badge,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import {
  useAddPostMutation,
  useAddPostPhotosMutation,
} from "../slices/postApiSlice";
import Loader from "../components/Loader";
import UserPost from "../components/UserPost";
import { LinkContainer } from "react-router-bootstrap";

const MainHomeScreen = () => {
  const [forYouPosts, setForYouPosts] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  const [postText, setPostText] = useState("");
  const [selectedPostImages, setSelectedPostImages] = useState([]);
  const [tagSelected, setTagSelected] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const inputFile = useRef(null);

  const removeItem = (indexToRemove) => {
    const updatedItems = selectedPostImages.filter(
      (_, index) => index !== indexToRemove
    );

    setSelectedPostImages(updatedItems);
  };
  const removeTag = (indexToRemove) => {
    const updatedTags = tagArray.filter((_, index) => index !== indexToRemove);

    setTagArray(updatedTags);
  };

  const handleTags = (e) => {
    e.preventDefault();
    if (tagSelected && tagSelected.trim() !== "") {
      setTagArray([...tagArray, tagSelected.trim()]);
      setTagSelected("");
    }
  };

  const [addPost, { isLoading: postLoading }] = useAddPostMutation();
  const [addPostPhotos] = useAddPostPhotosMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //For Photo Upload

    if (tagArray.length === 0) {
      const formData = new FormData();
      for (let file of selectedPostImages) {
        formData.append("images", file);
      }
      try {
        const res = await addPostPhotos(formData).unwrap();
        await addPost({
          postText,
          postImages: res.filePaths,
        }).unwrap();
        toast.success("Post Uploaded Successfully");
        setPostText("");
        setSelectedPostImages([]);
        setTagArray([]);
      } catch (err) {
        console.log(err?.data?.message || err.error);
        toast.error(err?.data?.message || err.error);
      }
      ///For Post Upload
    } else {
      const formData = new FormData();
      for (let file of selectedPostImages) {
        formData.append("images", file);
      }
      try {
        const res = await addPostPhotos(formData).unwrap();
        await addPost({
          postText,
          postImages: res.filePaths,
          tagTitle: tagArray,
        }).unwrap();
        toast.success("Post Uploaded Successfully");
        setPostText("");
        setSelectedPostImages([]);
        setTagArray([]);
      } catch (err) {
        console.log(err?.data?.message || err.error);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <HomeScreen>
      <Container>
        <Row>
          <Col md={1}>
            <Container className="rounded-circle">
              <Image
                src={userInfo.profileImage}
                style={{ width: "2rem", borderRadius: "20px" }}
              />
            </Container>
          </Col>

          <Col md={11} className="font-light">
            <Form className="my-1 " onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={{
                    overflow: "hidden",
                    border: "none",

                    fontSize: "20px",
                    color: "white",
                  }}
                  className=" py-1 bg-transparent"
                  type="text"
                  name="postText"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="What's happening..."
                />
                <hr />
                <GrGallery
                  onClick={() => inputFile.current.click()}
                  className="bg-transparent fs-4 p-1 rounded imageHover"
                />
                <Form.Control
                  type="file"
                  name="postImages"
                  hidden
                  multiple
                  ref={inputFile}
                  onChange={(e) => {
                    const files = e.target.files;
                    const selectedFiles = Array.from(files);
                    setSelectedPostImages(selectedFiles);
                  }}
                />

                <p className="my-1 fs-8 text-primary">
                  {selectedPostImages.length >= 1
                    ? ""
                    : "You can select upto 5 images at once"}

                  {selectedPostImages.length > 5
                    ? "You can only select 5 images "
                    : selectedPostImages.map((file, index) => (
                        <Badge>
                          {file.name}
                          <ImCross
                            className="mx-1 imageHover"
                            onClick={() => removeItem(index)}
                          />
                        </Badge>
                      ))}
                </p>
                <InputGroup>
                  <Form.Control
                    type="text"
                    className="bg-transparent text-light"
                    value={tagSelected}
                    name="tagSelected"
                    placeholder="Missing some tags huh.."
                    onChange={(e) => setTagSelected(e.target.value)}
                  />
                  <Button onClick={handleTags}>Add</Button>
                </InputGroup>
                <p>
                  {tagArray.map((x, index) => (
                    <Badge>
                      {x}
                      <ImCross
                        className="mx-1 imageHover"
                        onClick={() => removeTag(index)}
                      />
                    </Badge>
                  ))}
                </p>
              </Form.Group>
              {postLoading ? (
                <Loader />
              ) : (
                <Button variant="outline-primary w-25" onClick={handleSubmit}>
                  Post
                </Button>
              )}
            </Form>
          </Col>
        </Row>
        <hr />
      </Container>
      {forYouPosts ? <UserPost /> : <></>}
    </HomeScreen>
  );
};

export default MainHomeScreen;
