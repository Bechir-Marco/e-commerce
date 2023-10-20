import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent';
import { logout } from '../../../redux/actions/userActions';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
type ProductsPageComponentProps  = {
    fetchProducts(): Promise<any>;
    deleteProduct(productId: any): Promise<any>;
}
type Product = {
    name: string,
    price: number,
    category: string,
    _id : string
}
const ProductsPageComponent: React.FC<ProductsPageComponentProps> = ({
    fetchProducts, deleteProduct
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDeleted, setProductDeleted] = useState(false);
    const dispatch = useDispatch()<any>;


  const deleteHandler = async (productId:any) => {
    if (window.confirm('Are you sure?')) {
        const data = await deleteProduct(productId);
        
      if (data.message === 'product removed') {
        setProductDeleted(!productDeleted);
      }
    }
  };

useEffect(() => {
  // const abctrl = new AbortController();
  const fetchData = async () => {

    try {
      const response = await fetchProducts();
      
      setProducts(response);
    } catch (error) {
      
        console.error('Error fetching products:', error);
        dispatch(logout());
      
    }
  };

  fetchData();

  // return () => {
  //   // Cleanup function remains the same
  //   abctrl.abort();
  // };
}, [productDeleted]);




  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Product List{' '}
          <LinkContainer to="/admin/create-new-product">
            <Button variant="primary" size="lg">
              Create new
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <LinkContainer to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {' / '}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductsPageComponent;
