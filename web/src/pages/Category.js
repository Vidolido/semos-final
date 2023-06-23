import { useLocation } from 'react-router-dom';
import Events from '../components/Events';

const Category = () => {
	const location = useLocation().pathname.split('/');
	let category = location.at(-1);
	console.log(console.log(typeof category));
	return (
		<div>
			<h1>{category && category}</h1>
			{category && <Events cat={category.toString()} />}
		</div>
	);
};

export default Category;
