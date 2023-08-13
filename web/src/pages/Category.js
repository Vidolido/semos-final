import { useParams } from 'react-router-dom';
import Events from '../components/Events';

const Category = () => {
	let { cat } = useParams();
	return <div className='twoColumnGrid'>{cat && <Events cat={cat} />}</div>;
};

export default Category;
