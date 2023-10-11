import EditProductPageComponent from './components/EditProductPageComponent';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveAttributeToCatDoc } from '../../redux/actions/categoryActions';
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from './utils/utils';


const fetchProduct = async (productId:any) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId:any, formInputs:any) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state:any) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath:any, productId:any) => {
    try {
      let encoded = encodeURIComponent(imagePath);

      if (process.env.NODE_ENV !== 'production') {
        await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
      } else {
        await axios.delete(
          `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
        );
      }

      // La suppression a réussi, vous pouvez effectuer des actions supplémentaires si nécessaire.
    } catch (error) {
      // Gérer l'erreur ici
      console.error("Erreur lors de la suppression de l'image:", error);
      // Vous pouvez afficher un message d'erreur ou effectuer d'autres actions d'erreur
    }
  };


  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminEditProductPage;
