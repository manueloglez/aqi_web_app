import React from 'react';
import Autosuggest from 'react-autosuggest';
import './autosuggest.css';

class ServerAutoSuggest extends React.Component {
    constructor() {
        super();

        //Define state for value and suggestion collection
        this.state = {
            value: '',
            suggestions: []
        };
    }

    // Filter logic
    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        let response = await fetch(`api/v1/cities/search?q=${inputValue}`);
        let data = await response.json()
        return data;
    };

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.name;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span className="name">
                {suggestion.name}
            </span>
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(data => {
                console.log(data)
                if (data.Error) {
                    this.setState({
                        suggestions: []
                    });
                } else {
                    this.setState({
                        suggestions: data
                    });
                }
            })
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, {suggestion}) => {
        console.log(suggestion)
    }

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Type movie name',
            value,
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default ServerAutoSuggest;