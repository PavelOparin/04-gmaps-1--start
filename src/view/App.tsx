import { Component } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";
// const log = (...args) => console.log.apply(null, ["App -->", ...args]);
const log = (...args: any[]) => console.log("App -->", ...args);


interface State {
  lat: number;
  lng: number;
  zoom: number;
}
// London 51.5287398,-0.2664032,11
// Paris 48.8589384,2.264635,12

// const telAvivCoordinates = 
// const londonCoordinates = 
// const parisCoordinates = 
type Coordinate = {
  lat: number;
  lng: number;
}
type Coordinates = {
  tel_Aviv: Coordinate;
  london: Coordinate;
  paris: Coordinate;
}

const coordinates: Coordinates = {
  tel_Aviv:{ lat: 32.0042938, lng: 34.7615399 },
  london:{ lat: 51.5287398, lng: -0.2664032 },
  paris:{ lat: 48.8589384, lng: 2.264635 },
}
export class App extends Component<object, State> {
  state = {
    lat: -34.397,
    lng: 150.644,
    zoom: 8
  };

  reposition(city: keyof Coordinates) {
    this.setState(coordinates[city]);
  }

  render() {
    log(this.state);
    return (
      <div className="app">
        <TopBar><h1>Google Maps Example in React</h1></TopBar>
        
        <div className="hbox mb20">
          <button onClick={() => this.reposition("tel_Aviv")}>Tel Aviv</button>
          <button onClick={() => this.reposition("london")}>London</button>
          <button onClick={() => this.reposition("paris")}>Paris</button>
          
          <input 
            type="number" min="8" max="16" placeholder="8" 
            onChange={(e) => this.setZoom(Number(e.target.value))} 
          />
        </div>
        
        <GoogleMap lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} />
      </div>
    );
  }

  private setZoom(zoom: number) {
    this.setState({ zoom});
  }
}
