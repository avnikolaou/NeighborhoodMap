import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"

class ListMarkers extends Component {

    state = {
        query: ""
    };

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    clearQuery = () => {
        this.setState({ query: "" })
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
            <div className = "list-contacts">
                <div className = "list-contacts-top">
                    <input
                        className = "search-contacts"
                        type = "text"
                        placeholder = "Search a place of interest"
                        value = {query}
                        onChange = {(event) => this.updateQuery(event.target.value)}
                    />

                </div>
                <div className = "list-contacts-bot">
                    {showingMarkers.map((marker) => (
                        <div key = {marker.id} className = "contact-list-item">
                            <div className = "contact-details">
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