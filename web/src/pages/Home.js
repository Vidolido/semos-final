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
					</div>
					<div className='homeComedyEvents'>
						<Events cat='comedy' />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
