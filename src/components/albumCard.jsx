import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Col>
      <Card border="dark" style={{ width: "24rem" }}>
        <Card.Img variant="top" src={imgurl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{date}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}
