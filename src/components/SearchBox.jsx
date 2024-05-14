import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/home/searchUser/${keyword}`);
    } else {
      navigate("/home/searchUser");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        placeholder="Search Products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 bg-transparent text-light"
      ></Form.Control>
      <Button type="submit" variant="outline-primary" className="p-2 mx-2 px-3">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
