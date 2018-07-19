import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"
import "./App.css"

class ListMarkers extends Component {

    state = {
        query: ""
    };

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    render() {

        const { markers } = this.props;
        const { query } = this.state;

        let showingMarkers;
        if (query) {
            const match = new RegExp(escapeRegExp(query), "i");
            showingMarkers = markers.filter((marker) => match.test(marker.name))
        } else {
            showingMarkers = markers;
        }

        showingMarkers.sort(sortBy("name"));

        return (
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
        )
    }
}

export default ListMarkers