import React,{ useState }  from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { TextField } from '@mui/material';


const PlaceSearch = ({ location, dispatch  }) => {    
   
  const handlePlaceChange = async (newValue) => {
    dispatch(newValue);
    console.log(newValue);
     
  };
 

  return (
    < PlacesAutocomplete
      value={location}
      onChange={handlePlaceChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          < TextField
            label="Location"
            variant="outlined"
            fullWidth
            {...getInputProps()}
          />
          <div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                {...getSuggestionItemProps(suggestion)}
              >    
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceSearch;
