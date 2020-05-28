import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from "leaflet";
import './styles/contact.scss';

const icon = new Icon({
  iconUrl: "/images/marker.png",
  iconSize: [25, 25]
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [38.897538, -77.0356448]
    }
  }

  render() {
    return (
      <main className="content contact">
          <img className="contact__ava" src="images/ava.jpg" alt="Avatar"></img>
          <p><b>Name:</b> Andrew Shylo</p>
          <p><b>Email:</b> consequence098@gmail.com</p>
          <p><b>Telegram:</b> @SaintAtheist</p>
          <div className="contact__map">
            <Map style={{width: "100%", height: "500px"}} center={this.state.position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              <Marker position={this.state.position} icon={icon}>
                <Popup>My home yes i live in white house jalous me</Popup>
              </Marker>
            </Map>
          </div>
      </main>
    );
  }
}

export default Contact;
