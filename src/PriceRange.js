import React, { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const PriceRange = ({ quoteData, onBack, onSubmit }) => {
	const [priceRange, setPriceRange] = useState(null);
	const [distance, setDistance] = useState(null);

	useEffect(() => {
		const calculateDistance = async () => {
			if (quoteData) {
				// Wait until google is available
				const interval = setInterval(async () => {
					if (window.google) {
						clearInterval(interval);
						const { DistanceMatrixService } = await window.google.maps.importLibrary("routes");
						const service = new DistanceMatrixService();
						const origins = [
							{
								lat: quoteData.from.geometry.location.lat(),
								lng: quoteData.from.geometry.location.lng(),
							},
						];
						const destinations = [
							{
								lat: quoteData.to.geometry.location.lat(),
								lng: quoteData.to.geometry.location.lng(),
							},
						];

						service.getDistanceMatrix(
							{
								origins: origins,
								destinations: destinations,
								travelMode: window.google.maps.TravelMode.DRIVING,
							},
							(response, status) => {
								if (status === "OK") {
									const distanceInMeters = response.rows[0].elements[0].distance.value;
									const distanceInMiles = distanceInMeters / 1609.34;
									setDistance(distanceInMiles);
									const price = 400 + distanceInMiles * 0.8;
									const lowerBound = Math.round((price * 0.9) / 10) * 10;
									const upperBound = Math.round((price * 1.1) / 10) * 10;
									setPriceRange({ lowerBound, upperBound });
								}
							}
						);
					}
				}, 100);

				return () => clearInterval(interval);
			}
		};

		calculateDistance();
	}, [quoteData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ ...quoteData, priceRange });
	};

	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={libraries}>
			<div>
				<h2>Estimated Price Range</h2>
				{priceRange && (
					<p>
						£{priceRange.lowerBound} - £{priceRange.upperBound}
					</p>
				)}
				{distance && <p>Distance: {distance.toFixed(2)} miles</p>}
				<form onSubmit={handleSubmit}>
					<div>
						<label>Booking Name:</label>
						<input type="text" required />
					</div>
					<div>
						<label>Address:</label>
						<input type="text" required />
					</div>
					<button type="submit">Request Full Quote</button>
				</form>
				<button onClick={onBack}>Back</button>
			</div>
		</LoadScript>
	);
};

export default PriceRange;
