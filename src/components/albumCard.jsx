import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AlbumCard(props) {
  const { name, date, imgurl } = props;
  return (
    <Card
      style={{
        width: "15rem",
        borderRadius: "0.3rem",
        margin: "1.5rem",
        padding: "0.05rem",
        alignSelf: "start",
        textAlign: "start",
      }}
    >
      <Card.Img src={imgurl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{date}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
