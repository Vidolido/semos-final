import { useParams } from 'react-router-dom';
import Events from '../components/Events';

const Category = () => {
	let { cat } = useParams();
	return (
		<div>
			{/* <h1>{cat && cat}</h1> */}
			{cat && <Events cat={cat} />}
		</div>
	);
};

export default Category;
