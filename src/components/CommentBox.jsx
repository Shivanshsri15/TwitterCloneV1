import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import CommentBoxInside from "./CommentBoxInside";

const CommentBox = ({ commentData }) => {
  return (
    <Container>
      <Row>
        {commentData?.map((c) => (
          <CommentBoxInside commentBoxInsideData={c} />
        ))}
      </Row>
    </Container>
  );
};

export default CommentBox;
