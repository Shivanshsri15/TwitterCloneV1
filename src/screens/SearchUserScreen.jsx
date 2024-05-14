import React from "react";
import HomeScreen from "./HomeScreen";
import SearchBox from "../components/SearchBox";
import { useGetUserBySearchQuery } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Container, Image, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SearchUserScreen = () => {
  const { keyword } = useParams();
  const { data, isLoading } = useGetUserBySearchQuery({ keyword });
  console.log(data);
  return (
    <HomeScreen>
      <div>
        <SearchBox />
        {isLoading && <Loader />}

        <Container className="mt-4">
          <ListGroup>
            {data?.length !== 0 ? (
              data?.map((u) => (
                <LinkContainer to={`/home/${u.firstName}/${u._id}`}>
                  <ListGroup.Item variant="secondary" action className="m-1">
                    <Image
                      src={u.profileImage}
                      style={{
                        height: "2rem",
                        width: "2rem",
                        display: "inline",
                      }}
                      fluid
                      responsive
                      className="m-1"
                      roundedCircle
                    ></Image>
                    <strong className="pt-2 ps-2">
                      {u.firstName} {u.surname}
                    </strong>
                    <span className="ps-2">({u.email})</span>
                  </ListGroup.Item>
                </LinkContainer>
              ))
            ) : (
              <h1>User Not Found</h1>
            )}
          </ListGroup>
        </Container>
      </div>
    </HomeScreen>
  );
};

export default SearchUserScreen;
