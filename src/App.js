import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuoteForm from "./QuoteForm";
import PriceRange from "./PriceRange";
import AvailabilityCalendar from "./AvailabilityCalendar";

function App() {
	const [quoteData, setQuoteData] = useState(null);

	const handleSubmit = (data) => {
		// Send details via email or to a backend for further processing
		console.log(data);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<QuoteForm onQuote={setQuoteData} />} />
				<Route
					path="/price-range"
					element={
						<PriceRange
							quoteData={quoteData}
							onBack={() => setQuoteData(null)}
							onSubmit={handleSubmit}
						/>
					}
				/>
				<Route path="/calendar" element={<AvailabilityCalendar />} />
			</Routes>
		</Router>
	);
}

export default App;
