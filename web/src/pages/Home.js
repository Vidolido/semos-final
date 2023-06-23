import Events from '../components/Events';

const Home = () => {
	return (
		<div className='home'>
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
