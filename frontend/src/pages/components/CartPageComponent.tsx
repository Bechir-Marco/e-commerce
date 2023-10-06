import { Container, Row, Col, Alert, ListGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CartItemComponent from '../../components/CartItemComponent';

interface CartPageComponentProps {
  addToCart: (
    productId: any,
    quantity: any
  ) => (dispatch: any, getState: any) => Promise<void>;
  removeFromCart: (productId: any, quantity: any, price: any) => void;
  cartItems: any;
  cartSubtotal: any;
  reduxDispatch(action: any): any;

}
const CartPageComponent = ({
  addToCart,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}: CartPageComponentProps) => {

    const changeCount = (productID:any, count:any) => {
      reduxDispatch(addToCart(productID, count));
    };

    const removeFromCartHandler = (productID:any, quantity:any, price:any) => {
      if (window.confirm('Are you sure?')) {
        reduxDispatch(removeFromCart(productID, quantity, price));
      }
    };


  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty</Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item: any, idx: any) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  changeCount={changeCount}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.length}{' '}
                {cartItems.length === 1 ? 'Product' : 'Products'})
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button">
                  Proceed To Checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
