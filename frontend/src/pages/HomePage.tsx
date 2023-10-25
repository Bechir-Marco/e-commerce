import HomePageComponent from './components/HomePageComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';

const getBestsellers = async () => {
  try {
    const { data } = await axios.get('/api/products/bestsellers');
    return data;
  } catch (error) {
    console.log(error);
  }
};

const HomePage = () => {
  const { categories } = useSelector((state:any) => state.getCategories);

  return (
    <HomePageComponent
      categories={categories}
      getBestsellers={getBestsellers}
    />
  );
};

export default HomePage;
