import React from "react";
import { ListGroup } from "react-bootstrap";

const CommentBoxInside = ({ commentBoxInsideData }) => {
  //   console.log("CommentBoxInside", commentBoxInsideData);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div style={{ maxHeight: "200px", overflow: "auto" }}>
      <ListGroup className="m-2">
        <ListGroup.Item variant="dark" className="bg-transparent">
          <strong>
            <span>{commentBoxInsideData.commentName}: </span>
          </strong>
          <span>{commentBoxInsideData.commentText} </span>
          <span> ({formatDate(commentBoxInsideData.createdAt)})</span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default CommentBoxInside;
