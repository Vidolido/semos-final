import { useEffect, Fragment } from 'react';
import { useEvents } from '../../hooks/useEvents';

import { months, dates } from '../../misc/dateTime';

const RelatedEvents = ({
	cat,
	eventId,
	handleOnChange,
	handleAdd,
	isLoading,
}) => {
	const { getEventsByCategory, category } = useEvents();

	useEffect(() => {
		getEventsByCategory(cat);
	}, [cat]);

	return (
		<Fragment>
			<div className='inputContainer'>
				<label>Related events</label>
				<select
					name='relatedEvents'
					onChange={handleOnChange}
					defaultValue='Choose Event'>
					<option value='Choose Event' disabled hidden>
						Choose Event
					</option>
					{category &&
						category[cat] &&
						category[cat].map((event) => {
							let date = new Date(event.eventDate);

							if (event._id === eventId) return;

							return (
								<option key={event._id} value={event._id}>{`${
									event.eventName
								} - ${months[date.getMonth()]} ${date.getDate()}${
									dates[date.getDate()]
								}, ${date.getFullYear()} - ${event.location} `}</option>
							);
						})}
				</select>
			</div>
			<div className='inputContainer'>
				<label>Event Details</label>
				<button
					onClick={handleAdd}
					type='submit'
					className='btn-blackToTransparent'
					value='Add'
					disabled={isLoading}>
					Add
				</button>
			</div>
		</Fragment>
	);
};

export default RelatedEvents;
