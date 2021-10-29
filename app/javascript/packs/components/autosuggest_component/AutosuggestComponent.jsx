import React, { useState } from 'react';
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import './autosuggest.css';
const AsyncTypeahead = withAsync(Typeahead);

const CustomAutoSuggest = (props) => {
    const [ suggestions, setSuggestions ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false);


    const handleSearch = (query) => {
        setIsLoading(true);
    
        fetch(`api/v1/cities/search?q=${query}`)
          .then((resp) => resp.json())
          .then((items) => {
            const options = items;
    
            setSuggestions(options);
            setIsLoading(false);
          });
      };
    
    const onSuggestionSelected = (selected) => {
        if (selected[0]) props.onCitySelected(selected[0])
    }

    const filterBy = () => true;

    return (
        <div className="d-flex w-100 mb-3">
            <span>Search for a city</span>
            <AsyncTypeahead className="w-100"
            id="async-search"
            filterBy={filterBy}
            labelKey="name"
            isLoading={isLoading}
            onSearch={handleSearch}
            options={suggestions}
            onChange={onSuggestionSelected}
        />
        </div>

    );
}

export default CustomAutoSuggest;