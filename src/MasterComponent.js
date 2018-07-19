import React, { Component } from "react"
import { Map , GoogleApiWrapper } from "google-maps-react"

class MasterComponent extends Component {

    state = {
        markers: []
    };


    render() {
        return (
            <div className="map-container">
                <Map
                    google={ this.props.google }
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    initialCenter={{
                        lat: 40.270508,
                        lng: 22.503172
                    }}
                    zoom={16}
                    >
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper ({
    apiKey: "AIzaSyCzL24aG9TbvoXQPeay7JKptY_mB4bx-fg"
})(MasterComponent)