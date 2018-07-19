import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"
import "./App.css"
import { Map , GoogleApiWrapper ,Marker } from "google-maps-react"

const styles = [
    {
        featureType: 'water',
        stylers: [
            { color: '#19a0d8' }
        ]
    },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#ffffff' },
            { weight: 6 }
        ]
    },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#e85113' }
        ]
    },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -40 }
        ]
    },{
        featureType: 'transit.station',
        stylers: [
            { weight: 9 },
            { hue: '#e85113' }
        ]
    },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
            { visibility: 'off' }
        ]
    },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            { lightness: 100 }
        ]
    },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            { lightness: -100 }
        ]
    },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            { visibility: 'on' },
            { color: '#f0e4d3' }
        ]
    },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -25 }
        ]
    }
];

class ListMarkers extends Component {

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        this.foursquareSearch(query)
    };

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
        showingMarkers: [],
        query: "",
        testingapi: []
    };

    foursquareSearch = (query) => {


        const cid = "NRXHVBL5PSNLQAABA3AH5U2H2335E01HNKCLDP0TKJ3MFU3R";
        const csecret = "UTUG2HSWFYMZSXFMUL241ET3NBAJCQ1JISWR0EXHWNWONWGP";
        let lat = 40.271251;
        let long = 22.506292;


        fetch(`https://api.foursquare.com/v2/venues/explore?ll=${lat},${long}&radius=1000&venuePhotos=1&query=${query}&client_id=${cid}&client_secret=${csecret}&v=20180323`)
            .then( (response) => {
                return response.json()
            }).then((json) => {
                this.setState({
                    testingapi: json.response.groups["0"].items
                })
            });
        console.log(this.state.testingapi);
    };


    render() {

        let { showingMarkers} = this.props;
        const { query, markers, } = this.state;

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            showingMarkers = markers.filter((marker) => match.test(marker.name))
        } else {
            showingMarkers = markers;

            console.log("Markers", markers);
            console.log("ShowingMarkers", showingMarkers)
        }

        showingMarkers.sort(sortBy("name"));

        return (
            <div className="main-container">
                <div className="map-container">
                    <Map
                        google = { this.props.google }
                        style = {{ width: '100%', height: '100%', position: 'relative' }}
                        initialCenter={{
                            lat: 40.270508,
                            lng: 22.503172
                        }}
                        zoom={16}
                        styles = {styles}
                    >
                        {showingMarkers.map((mark) =>
                            <Marker
                                key = { mark.id }
                                name = { mark.name }
                                position = {{ lat: mark.lat, lng: mark.lng }}
                            />
                        )}
                    </Map>
                </div>
                <div className = "list-markers">
                    <div className = "list-markers-top">
                        <input
                            className = "search-markers"
                            type = "text"
                            placeholder = "Search a place of interest"
                            value = {query}
                            onChange = {(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                    <div className = "list-markers-bot">

                        {showingMarkers.map((marker) => (
                            <div key = {marker.id} className = "marker-list-item">
                                <div className = "marker-details">
                                    <p>{marker.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper ({
    apiKey: "AIzaSyCzL24aG9TbvoXQPeay7JKptY_mB4bx-fg"
})(ListMarkers)