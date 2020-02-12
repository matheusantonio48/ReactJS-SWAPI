import React, { Component } from "react";
import "./Home.scss";
import "typeface-roboto";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import logo from "../../imgs/logo.png";
import { SolarSystemLoading } from "react-loadingg";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      numbPlanets: Math.floor(Math.random() * (6 - 1)),
      data: [],
      films: [],
      loading: false
    };
  }

  nextPlanet(min, max) {
    this.setState({ loading: true });
    min = Math.ceil(min);
    max = Math.floor(max);
    this.setState({
      numbPlanets: Math.floor(Math.random() * (max - min)) + min
    });
    let url = "https://swapi.co/api/planets/" + this.state.numbPlanets;
    axios
      .get(url)
      .then(response => {
        this.setState({ data: response.data });
        axios.all(this.state.data.films.map(l => axios.get(l))).then(res => {
          this.setState({ films: res });
          this.setState({ loading: false });
        });
      })
      .catch({})
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {
    return (
      <div className="stars" maxWidth="xl">
        <div maxWidth="xl" className="twinkling">
          <Container className="header">
            <img src={logo} alt="logo" className="logo"></img>
          </Container>
          <Container className="container" maxWidth="md">
            {this.state.loading === false ? (
              <Container className="containerPrincipal" maxWidth="md">
                {this.state.data.length === 0 ? null : (
                  <img
                    src={require("../../imgs/planetas/" +
                      this.state.data.name +
                      ".png")}
                    alt="planetas"
                    className="planetImage"
                  ></img>
                )}
                <Container className="planets" maxWidth="xs">
                  <h6 className="namePlanet">{this.state.data.name}</h6>
                </Container>
                <Container>
                  <h1 className="childrens">
                    Population: {this.state.data.population}
                  </h1>
                </Container>
                <h1 className="childrens">
                  Climate: {this.state.data.climate}
                </h1>
                <h1 className="childrens">
                  Terrain: {this.state.data.terrain}
                </h1>
                <Container className="containerFilms" maxWidth="xs">
                  {this.state.films.length === 0 ? (
                    <h1 className="films">No movies</h1>
                  ) : (
                    this.state.films.map(f => (
                      <h1 className="films" key={f.data.episode_id}>
                        {f.data.title} - Episode: {f.data.episode_id}
                      </h1>
                    ))
                  )}
                </Container>
              </Container>
            ) : (
              <SolarSystemLoading />
            )}
          </Container>
          <Container className="buttonNextContainer" maxWidth="xs">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.nextPlanet(1, 61)}
            >
              Next Planet
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
