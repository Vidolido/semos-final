import { useEffect, useState } from 'react';

import { useStorage } from '../../hooks/useStorage';

import { ReactComponent as Logo } from './logo.svg';
import { months, dates } from '../../misc/dateTime';
import qrcodeImage from '../../misc/qr_code.jpg';

const Ticket = ({ options, setOptions }) => {
	let { event } = options;

	let date = new Date(event.eventDate);

	const [image, setImage] = useState();

	const { downloadFile } = useStorage();

	useEffect(() => {
		downloadFile(event.eventImage).then((file) => setImage(file));
	}, []);

	const handleClick = () => {
		setOptions((prevState) => ({
			show: false,
		}));
	};
	return (
		<div className='ticketModal' onClick={handleClick}>
			<div className='logoContainer'>
				<Logo />
			</div>
			<div className='ticketImageContainer'>
				<img src={image} alt={event.eventName} />
			</div>
			<div className='ticketInfo'>
				<div className='info'>
					<h2>{event.eventName}</h2>
					<span className='block purpleText boldText mediumText'>{`${
						months[date.getMonth()]
					} ${date.getDate()}${
						dates[date.getDate()]
					}, ${date.getFullYear()}`}</span>

					<span className='mediumText blackText'>{event.location}</span>
				</div>
				<div className='qrcode'>
					<img
						width={150}
						src={qrcodeImage}
						alt='something interesting about the code'
					/>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
