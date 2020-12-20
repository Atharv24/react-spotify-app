import React from "react";
import { Container, Row } from "react-bootstrap";
import AlbumCards from "./components/albumCards";
const base64 = require("base-64");

const artistID = "22bE4uQ6baNwSHPVcDxLCe";

const clientID = "377d14317ba44fd481f014dc81e2bcf8";
const secretID = "3582e78a89be40a6a31ec7bad5383cd5";
const encodedID = base64.encode(clientID + ":" + secretID);

const refresh_token =
  "AQDssNsrpoYadApmgNH-9KT0ckREt7kUF81CEXotT8rr-ene-cEyrO9yNbiEcYTV1Ksf7w2zut-DWmnpmGyBRgQFqPYJ6QMCg25Ut6m0U7Liyx6PmMXHFPcR8NVU8TFGIOw";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      access_token: "",
    };
  }

  componentDidMount() {
    this.getAlbumData();
  }

  getAlbumData() {
    fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${this.state.access_token}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error();
      })
      .then((result) => this.setAlbums(result.items))
      .catch(() => {
        this.refreshToken();
      });
  }

  refreshToken() {
    let details = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };

    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      headers: new Headers({
        Authorization: `Basic ${encodedID}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: formBody,
    })
      .then((res) => res.json())
      .then((res) => this.setState({ access_token: res.access_token }))
      .then(() => this.getAlbumData());
  }

  setAlbums(data) {
    if (!data) return;
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
