import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from 'react-bootstrap';
import CartItemComponent from '../../../components/CartItemComponent';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
export type UserCartDetailsPageComponentProps = {
  cartItems: any;
  itemsCount: Number;
  cartSubtotal: any;
  userInfo: any;
  addToCart(id: Number, count: Number): any;
  removeFromCart(id: Number, quantity: Number, price: any): any;
  reduxDispatch(a :any): any;
  getUser(): Promise<any>;
  createOrder(a: any): Promise<any>;
};
type dataProps = {
  address: String;
  city: String;
  zipCode: String;
  state: String;
    phoneNumber: any;
    country: String
};
const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  addToCart,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
}: UserCartDetailsPageComponentProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState<dataProps>();
const [missingAddress, setMissingAddress] = useState<string | boolean>();
  const [paymentMethod, setPaymentMethod] = useState('pp');

  const navigate = useNavigate();

  const changeCount = (productID: number, count: number) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID:any, quantity:any, price:any) => {
    if (window.confirm('Are you sure?')) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  useEffect(() => {
    getUser()
      .then((data:dataProps) => {
        if (
          !data.address ||
          !data.city ||
          !data.country ||
          !data.zipCode ||
          !data.state ||
          !data.phoneNumber
        ) {
          setButtonDisabled(true);
          setMissingAddress(
            ' .In order to make order, fill out your profile with correct address, city etc.'
          );
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
            state: data.state,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch((er) =>
        console.log(
          er.response
        )
      );
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item:any) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate('/user/order-details/' + data._id);
        }
      })
      .catch((err) => console.log(err));
  };

  const choosePayment = (e:any) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
            <b>Address</b>: {userAddress?.address} {userAddress?.city}{' '}
                {userAddress?.state} {userAddress?.zipCode} <br />
            <b>Phone</b>: {userAddress?.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select onChange={choosePayment}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                                  Not delivered
                                  {missingAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Not paid yet
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item:any, idx:any) => (
              <CartItemComponent
                item={item}
                key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
              />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{' '}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={orderHandler}
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  Place order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPageComponent;
