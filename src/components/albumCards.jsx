import React from "react";
import { Container } from "react-bootstrap";
import AlbumCard from "./albumCard";

export default function AlbumCards(props) {
  const { albums } = props;
  return (
    <Container
      fluid
      className="d-flex flex-wrap justify-content-center"
      style={{
        padding: "2rem",
      }}
    >
      {albums.map((album, id) => (
        <AlbumCard
          key={id}
          name={album.name}
          date={album.date}
          imgurl={album.imgurl}
        />
      ))}
    </Container>
  );
}
