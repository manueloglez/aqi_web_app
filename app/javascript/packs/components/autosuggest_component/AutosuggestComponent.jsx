import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './autosuggest.css';

const CustomAutoSuggest = (props) => {
    const [ value, setValue ] = useState('')
    const [ suggestions, setSuggestions ] = useState([])

    // Filter logic
    const getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        let response = await fetch(`api/v1/cities/search?q=${inputValue}`);
        let data = await response.json()
        return data;
    };

    // Trigger suggestions
    const getSuggestionValue = suggestion => suggestion.name;

    // Render Each Option
    const renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span className="name">
                {suggestion.name}
            </span>
        </span>
    );

    // OnChange event handler
    const onChange = (event, { newValue }) => {
        setValue(newValue)
    };

    // Suggestion rerender when user types
    const onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value)
            .then(data => {
                console.log(data)
                if (data.Error) {
                    setSuggestions([])
                } else {
                    setSuggestions(data)
                }
            })
    };

    // Triggered on clear
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const onSuggestionSelected = async (event, {suggestion}) => {
        props.onCitySelected(suggestion)
    }

    // Option props
    const inputProps = {
        placeholder: 'Type a city of the world',
        value,
        onChange: onChange
    };

    // Adding AutoSuggest component
    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
}

export default CustomAutoSuggest;