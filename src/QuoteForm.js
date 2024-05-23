import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const QuoteForm = ({ onQuote }) => {
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [days, setDays] = useState(1);
	const fromAutocomplete = useRef(null);
	const toAutocomplete = useRef(null);
	const navigate = useNavigate();

	const handleFromPlaceChanged = () => {
		if (fromAutocomplete.current) {
			const place = fromAutocomplete.current.getPlace();
			setFrom(place);
		}
	};

	const handleToPlaceChanged = () => {
		if (toAutocomplete.current) {
			const place = toAutocomplete.current.getPlace();
			setTo(place);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const fromPlace = fromAutocomplete.current ? fromAutocomplete.current.getPlace() : null;
		const toPlace = toAutocomplete.current ? toAutocomplete.current.getPlace() : null;
		if (fromPlace && toPlace) {
			onQuote({ from: fromPlace, to: toPlace, days });
			navigate("/price-range");
		}
	};

	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={libraries}>
			<form onSubmit={handleSubmit}>
				<div>
					<label>From:</label>
					<Autocomplete
						onLoad={(ref) => (fromAutocomplete.current = ref)}
						onPlaceChanged={handleFromPlaceChanged}
					>
						<input type="text" />
					</Autocomplete>
				</div>
				<div>
					<label>To:</label>
					<Autocomplete
						onLoad={(ref) => (toAutocomplete.current = ref)}
						onPlaceChanged={handleToPlaceChanged}
					>
						<input type="text" />
					</Autocomplete>
				</div>
				<div>
					<label>Days:</label>
					<select value={days} onChange={(e) => setDays(e.target.value)}>
						<option value={1}>1</option>
						<option value={2}>2</option>
					</select>
				</div>
				<button type="submit">Get Quote</button>
			</form>
		</LoadScript>
	);
};

export default QuoteForm;
