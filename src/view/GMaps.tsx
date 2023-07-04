import React, { Component } from "react";
// const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);
const log = (...args: any[]) => console.log("GoogleMap -->", ...args);

interface Props {
    lat: number;
    lng: number;
    zoom: number;
}

interface State {
  markerTitle: string;
}

export class GoogleMap extends Component<Props, State> {
  state = {
    markerTitle: ''
  }

  mapRef = React.createRef<HTMLDivElement>();
  map: google.maps.Map | null = null;

  shouldComponentUpdate(nextProps: Props) {
    log("shouldComponentUpdate >>>>");

    if(this.centerChanged(nextProps)){
      this.setMapCenter(nextProps);
    }
    if(this.zoomChanged(nextProps)) {
      this.setMapZoom(nextProps.zoom);
    }

    return true;
  }

  componentDidMount() {
    const {lat,lng,zoom = 8} = this.props;
    
    this.map = new google.maps.Map(this.mapRef.current as HTMLDivElement, {
      center: { lat, lng },
      zoom
    });
  }

  render() {
    return (
      <div  className="map-box">
        <label>
          Title 

          <input 
            value={this.state.markerTitle} 
            onChange={(e) => this.setState({markerTitle: e.target.value})}
          />
        </label>

        <button onClick={this.addMarker}>Add marker</button>

        <div ref={this.mapRef}  className="map-box"/>
      </div>
    );
  }
  
  private zoomChanged = (nextProps: Props) => {
    return this.props.zoom !== nextProps.zoom;
  }

  private centerChanged = (nextProps: Props) => {
    return this.props.lat !== nextProps.lat || this.props.lng !== nextProps.lng;
  }

  private setMapZoom = (zoom: number) => {
    (this.map as google.maps.Map).setZoom(zoom);
  }

  private setMapCenter = (props: { lat: number, lng: number }) => {
    (this.map as google.maps.Map).setCenter({ lat: props.lat, lng: props.lng });
  }

  private addMarker = () => {
    const mapCenter = this.map?.getCenter();
    const title = this.state.markerTitle;

    const infoWindow = new google.maps.InfoWindow({
      content: title,
      ariaLabel: "Uluru",
    });
  
    const marker = new google.maps.Marker({
      position: mapCenter,
      map: this.map,
      title,
    });
  
    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    log(this.map?.getCenter())
  }
}
