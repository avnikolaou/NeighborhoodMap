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
const markers = [
    {
        "name": "Mount Olympos",
        "id": 1,
        "lat": 40.088413,
        "lng": 22.358555
    },{
        "name": "Platamon Castle",
        "id": 2,
        "lat": 40.005145,
        "lng": 22.598205
    },{
        "name": "Ancient Dion Theatre",
        "id": 3,
        "lat": 40.172316,
        "lng": 22.491822
    },{
        "name": "Municipal Garden Katerini",
        "id": 4,
        "lat": 40.26987,
        "lng": 22.510235
    },{
        "name": "Paralia Katerini",
        "id": 5,
        "lat": 40.268008,
        "lng": 22.596413
    }
];

class ListMarkers extends Component {

    updateQuery = (query) => {
        this.setState({query: query.trim()});
    };

    state = {
        showingMarkers: [],
        query: "",
        isOpen: false,
        clickedMarkProps : {},
        pictures: []
    };

    // Request images from flickr (source: https://www.youtube.com/watch?v=RkXotG7YUek), open infoWindow

    openInfoWindow = (mark, prop) => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2021ae121adcbcf85420f272a4d6dfd&text=${prop.name}&per_page=3&format=json&nojsoncallback=1`)
            .then((response) => {
                return response.json();
            }).then(function(data) {
                let picArray = data.photos.photo.map((pic) => {

                    let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                    return(
                        <img alt={prop.name} className="infoWindow-pic" src={srcPath}>

                        </img>
                    )
                });
                this.setState({pictures: picArray});
            }.bind(this)).catch((error) => {
            alert("Could not load image from flickr!!");
        });

        this.setState({
            clickedMarkProps: prop,
            isOpen: true
        });
    };

    render() {

        let { showingMarkers } = this.props;
        const { query, clickedMarkProps } = this.state;

        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            showingMarkers = markers.filter((marker) => match.test(marker.name))
        } else {
            showingMarkers = markers;
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
                            <div key = {mark.id} className = "marker-list-item">
                                <div className = "marker-details">
                                    <p>{mark.name}</p>
                                </div>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="map-container">
                    <Map
                        google = {this.props.google}
                        initialCenter= {{lat: 40.172316, lng: 22.491822}}
                        zoom = {11}
                        styles = {styles}
                    >
                        {showingMarkers.map((mark) =>
                            <Marker
                                key = {mark.id}
                                name = {mark.name}
                                position = {{lat: mark.lat, lng: mark.lng}}
                                animation = {window.google.maps.Animation.DROP}
                                onClick = {this.openInfoWindow}
                            />
                        )}

                        <InfoWindow
                            marker = {this.state.clickedMarkProps}
                            visible = {this.state.isOpen}
                            options = {{pixelOffset: new this.props.google.maps.Size(0,-5)}}
                        >
                            <div className="infoWindow">
                                <h3>
                                    {clickedMarkProps.name}
                                </h3>
                                {this.state.pictures[2]}
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