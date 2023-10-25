import ProductCarouselComponent from '../../components/ProductCarouselComponent';
import CategoryCardComponent from '../../components/CategoryCardComponent';
import { Row, Container } from 'react-bootstrap';

import { useEffect, useState } from 'react';

type Props = {
    categories: any;
    getBestsellers: any;
};
const HomePageComponent = ({ categories, getBestsellers }: Props) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestsellers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getBestsellers()
      .then((data:any) => {
        setBestsellers(data);
      })
      .catch((er:any) => {
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        );
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        );
      });
    setMainCategories((cat) =>
      categories.filter((item:any) => !item.name.includes('/'))
    );
  }, [categories]);

  return (
    <>
      
      <ProductCarouselComponent bestSellers={bestSellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
        {error}
      </Container>
    </>
  );
};

export default HomePageComponent;
