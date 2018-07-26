import React, { Component } from 'react';
import './App.css';
import ListMarkers from "./ListMarkers";

class App extends Component {

    render() {

        return (
            <div>
                <h1 className="header"> My Neighborhood Map</h1>
                <ListMarkers/>
            </div>

        );
    }
}

export default App;
