import "./PlacesAutocomplete.css"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = ({ setMapInfo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (description) => {
    setValue(description, false);
    getGeocode({ address: description })
    .then(results => getLatLng(results[0]))
    .then(({ lng, lat }) => {
      setMapInfo(prev => ({
        ...prev,
        center: {lng, lat}
      }));
    })
    .catch(error => {
      console.log("😱 Error: ", error);
    });
  };

  return (
    <Combobox 
      onSelect={handleSelect} 
      aria-labelledby="demo"
      className="combobox">
      <ComboboxInput 
        value={value} 
        onChange={handleInput} 
        disabled={!ready}
        placeholder="Babcock University" />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;