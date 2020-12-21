import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Col>
      <Card
        style={{
          width: "12rem",
          borderRadius: "0.5rem",
          margin: "0.2rem",
        }}
      >
        <Card.Img src={imgurl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{date}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}
