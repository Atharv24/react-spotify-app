import React from "react";
import AlbumCards from "./components/albumCards";

import logo from "./resources/rolling-stones-logo-text.png";
import background from "./resources/bandCover.jpg";
import TopBar, { Footer } from "./components/navbars";
import { Container } from "react-bootstrap";

const base64 = require("base-64");

const artistID = "22bE4uQ6baNwSHPVcDxLCe";

const clientID = "377d14317ba44fd481f014dc81e2bcf8";
const secretID = process.env.REACT_APP_SECRET_ID;
const encodedID = base64.encode(clientID + ":" + secretID);

const refresh_token = process.env.REACT_APP_REFRESH_TOKEN;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      access_token:
        "BQD_hxVA1_qtfJ-1c_D_9neySPJYhxUu0u4YY1wTGO6eLhigXMuxhHCWxwgcwfts6fNtus8rLbTakNObiRWWEs3vgpGsF1kzHO9WgVP4_eSZ8YFiKqhihLbpvUATiNxMtbPG2sYS_niOQ1I9b4zkAuX3b3dSda45wCq0pwbBUw",
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
        if (!res.ok) {
          throw Error("Access Token Expired");
        }
        return res.json();
      })
      .then((result) => this.setAlbums(result.items))
      .catch(() => this.refreshToken());
  }

  refreshToken() {
    const details = {
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
      .then((res) => {
        this.setState({ access_token: res.access_token });
      })
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
      <Container
        fluid
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: 0,
        }}
      >
        <TopBar logo={logo} />
        <AlbumCards albums={this.state.albums} />
        <Footer text="Made by Abhishek" />
      </Container>
    );
  }
}
