import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import "./App.css"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"

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
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
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
    };

    state = {
        showingMarkers: [],
        query: "",
        testingapi: [],
        isOpen: false,
        clickedMark: {},
        clickedMarkProps : {}
    };

    componentDidMount() {
        this.foursquareSearch();
    };

    foursquareSearch = () => {
        fetch(`https://api.foursquare.com/v2/venues/explore?ll=40.271251,22.506292&radius=250&venuePhotos=1&query=cafe&client_id=NRXHVBL5PSNLQAABA3AH5U2H2335E01HNKCLDP0TKJ3MFU3R&client_secret=UTUG2HSWFYMZSXFMUL241ET3NBAJCQ1JISWR0EXHWNWONWGP&v=20180323`)
            .then( (response) => {
                return response.json()
            }).then((json) => {
                this.setState({
                    testingapi: json.response.groups["0"].items
                })
            });
    };

    openInfoWindow = (mark, prop) => {
        this.setState({
            clickedMark: mark,
            clickedMarkProps: prop,
            isOpen: true
        });
        console.log("this is the clicked mark", mark);
        console.log("this is the marks props",  prop)
    };

    render() {

        let { showingMarkers} = this.props;
        const { query, testingapi } = this.state;

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            showingMarkers = testingapi.filter((marker) => match.test(marker.venue.name))
        } else {
            showingMarkers = testingapi;
        }

        return (
            <div className="main-container">
                <div className = "list-markers">
                    <input
                        className = "search-markers"
                        type = "text"
                        placeholder = "Search for a specific place"
                        value = {query}
                        onChange = {(event) => this.updateQuery(event.target.value)}
                    />
                    <ul className = "list-markers-bot">
                        {showingMarkers.map((mark) => (
                            <div key = {mark.venue.id} className = "marker-list-item">
                                <div className = "marker-details">
                                    <p>{mark.venue.name}</p>
                                </div>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="map-container">
                    <Map
                        google = { this.props.google }
                        initialCenter= {{
                            lat: 40.270508,
                            lng: 22.503172
                        }}
                        zoom = {17}
                        styles = {styles}
                    >
                        {showingMarkers.map((mark) =>
                            <Marker
                                key = { mark.venue.id }
                                name = { mark.venue.name }
                                position = {{ lat: mark.venue.location.lat, lng: mark.venue.location.lng }}
                                animation = { window.google.maps.Animation.DROP}
                                onClick = { this.openInfoWindow }
                            />
                        )}

                        <InfoWindow
                            marker = {this.state.clickedMarkProps}
                            visible = {this.state.isOpen}
                            //position = {{ lat: mark.venue.location.lat, lng: mark.venue.location.lng }}
                            options = {{pixelOffset: new this.props.google.maps.Size(0,-10)}}
                        >
                            <div className="infowindow-div">
                                <h2>
                                    {this.state.clickedMarkProps.name}
                                </h2>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>

            </div>
        )
    }
}

export default GoogleApiWrapper ({
    apiKey: "AIzaSyCzL24aG9TbvoXQPeay7JKptY_mB4bx-fg"
})(ListMarkers)

/*

 */