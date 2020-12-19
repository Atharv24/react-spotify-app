import React from "react";

import AlbumCard from "./albumCard";

export default function AlbumCards(props) {
  const { albums } = props;
  return (
    <React.Fragment>
      {albums.map((album, id) => (
        <AlbumCard
          key={id}
          name={album.name}
          date={album.date}
          imgurl={album.imgurl}
        />
      ))}
    </React.Fragment>
  );
}
