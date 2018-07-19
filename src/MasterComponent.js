import React, { Component } from "react"
import { Map , GoogleApiWrapper ,Marker } from "google-maps-react"
import escapeRegExp from "escape-string-regexp"
import ListMarkers from "./ListMarkers"
import "./App.css"


class MasterComponent extends Component {

    state = {
        markers: [
            {
                "id": 1,
                "lat": 40.271111,
                "lng": 22.499646,
                "name": "Central Park"
            },
            {
                "id": 2,
                "lat": 40.271635,
                "lng": 22.501652,
                "name": "Mikel Coffee"
            },
            {
                "id": 3,
                "lat": 40.270587,
                "lng": 22.508347,
                "name": "Kartell Cafe Bar"
            },
            {
                "id": 4,
                "lat": 40.26987,
                "lng": 22.510235,
                "name": "Clepsydra Mind Games"
            },
            {
                "id": 5,
                "lat": 40.271962,
                "lng": 22.505300,
                "name": "AlDente Bistrorante"
            }
        ],
        showingMarkers: []

    };

    render() {
        
        const { query, markers } = this.state;

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            this.setState.showingMarkers = markers.filter((markers) => match.test(markers.name))
        } else {
            this.setState.showingMarkers = markers;
        }

        return (
            <div className="main-contaier">
                <div className="map-container">
                    <Map
                        google = { this.props.google }
                        style = {{ width: '100%', height: '100%', position: 'relative' }}
                        styles = { this.props.styles}
                        initialCenter={{
                            lat: 40.270508,
                            lng: 22.503172
                        }}
                        zoom={16}
                    >
                        {markers.map((mark) =>
                            <Marker
                                key = { mark.id }
                                name = { mark.name }
                                position = {{ lat: mark.lat, lng: mark.lng }}
                            />
                        )}
                    </Map>
                </div>
                <div className="list-container">
                    <ListMarkers markers = { markers }/>
                </div>
            </div>

        )
    }
}

export default GoogleApiWrapper ({
    apiKey: "AIzaSyCzL24aG9TbvoXQPeay7JKptY_mB4bx-fg"
})(MasterComponent)