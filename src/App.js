import React, { Component } from 'react';
import './App.css';
import MasterComponent from "./MasterComponent";
import ListMarkers from "./ListMarkers"

const markers = [
    {
        "id": 1,
        "lat": 40.270456,
        "lng": 22.270454,
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
];

class App extends Component {

    render() {
        return (
            <div className="main-container">
                <MasterComponent/>
                <ListMarkers markers = { markers }/>
            </div>

        );
    }
}

export default App;
