import React from "react";
import { Container, Row } from "react-bootstrap";
import AlbumCards from "./components/albumCards";

const artistID = "22bE4uQ6baNwSHPVcDxLCe";
const access_token =
  "BQBdFb90ooBuwM-Ng8IqFYAIaq52maOpPhoQTfMMGZvcDekZY1AkXIlJ2qrlRAxTZbhGhETZNLwswlvyV89jBs-tjxvomKWBGzgUvB3P4d6CKw8r2RiG6azytv_oNXQdP6O7OeGo_X7Tt0EYvEYKJ5ftSDLM7c4uqbTCovJ5eg";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  componentDidMount() {
    fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${access_token}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => this.setAlbums(result.items));
  }

  setAlbums(data) {
    const albums = data.map((albumInfo) => {
      const name = albumInfo.name;
      const date = albumInfo.release_date;
      const imgurl = albumInfo.images[0].url;
      return { name, date, imgurl };
    });
    this.setState({ albums });
  }

  render() {
    return (
      <Container fluid style={{ padding: "1rem" }}>
        <Row className="flex-nowrap overflow-auto">
          <AlbumCards albums={this.state.albums} />
        </Row>
      </Container>
    );
  }
}
