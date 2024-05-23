import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AvailabilityCalendar = () => {
	const [events, setEvents] = useState([]);

	const handleSelectSlot = ({ start, end }) => {
		const title = window.prompt("New Event name");
		if (title) {
			setEvents([...events, { start, end, title }]);
		}
	};

	return (
		<div>
			<Calendar
				localizer={localizer}
				events={events}
				selectable
				onSelectSlot={handleSelectSlot}
				style={{ height: 500 }}
			/>
		</div>
	);
};

export default AvailabilityCalendar;
