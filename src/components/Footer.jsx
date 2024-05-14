import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Row className="bg-black">
        <Col className="text-center text-light py-1">
          <p>TwitterClone &copy; {currentYear}</p>
          <p>Licenced and service product {currentYear}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
