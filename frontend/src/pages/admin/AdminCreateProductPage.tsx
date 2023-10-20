import CreateProductPageComponent from './components/CreateProductPageComponent';
import axios from 'axios';
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from './utils/utils';
import { useSelector } from 'react-redux';
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
} from '../../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';

const createProductApiRequest = async (formInputs: any) => {
  try {

    const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state:any) => state.getCategories);
  const dispatch = useDispatch();

  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      newCategory={newCategory}
      deleteCategory={deleteCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
    />
  );
};

export default AdminCreateProductPage;
