import Events from '../components/Events';
import Hero from '../components/Hero';

const Home = () => {
	return (
		<div className='home'>
			<Hero />
			<main>
				<div className='events'>
					<Events cat='music' />
					<Events cat='comedy' />
				</div>
			</main>
		</div>
	);
};

export default Home;
