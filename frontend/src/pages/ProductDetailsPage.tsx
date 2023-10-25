import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../redux/actions/cartActions';
import axios from 'axios';

const getProductDetails = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/products/get-one/${id}`);
    return data;
  } catch (error:any) {
    console.error(`Error in getProductDetails: ${error.message}`);
    throw error;
  }
};


const writeReviewApiRequest = async (productId: string, formInputs: any) => {
  try {
    const { data } = await axios.post(
      `/api/users/review/${productId}`,
      formInputs
    );
    return data;
  } catch (error:any) {
    console.error(`Error in writeReviewApiRequest: ${error.message}`);
    throw error;
  }
};



const ProductDetailsPage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state:any) => state.userRegisterLogin.userInfo);

  return (
    <ProductDetailsPageComponent
      addToCartReduxAction={addToCart}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      userInfo={userInfo}
      writeReviewApiRequest={writeReviewApiRequest}
    />
  );
};



export default ProductDetailsPage;

