import { useParams } from 'react-router-dom';
const ProductDetailsPage = () => {

    const { id } = useParams();
    console.log(id);
    return (
        <div> This is ProductDetailsPage Page </div>
    );
};
export default ProductDetailsPage;