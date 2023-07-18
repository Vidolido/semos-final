import { Link } from 'react-router-dom';
import Events from '../components/Events';
import Hero from '../components/Hero';

const Home = () => {
	return (
		<div className='home'>
			<Hero />
			<main>
				<div className='events'>
					<div className='homeMusicEvents'>
						<Events cat='music' />
						<Link
							to='/category/music'
							className='blackText text-center white-background border-radius-50 black-border button-padding full-width block tD-none'>
							See All Musical Concerts
						</Link>
					</div>
					<div className='homeComedyEvents'>
						<Events cat='comedy' />
						<Link
							to='/category/comedy'
							className='blackText text-center white-background border-radius-50 black-border button-padding full-width block tD-none'>
							See All Stand-up Comedy Shows
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
