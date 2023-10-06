import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import RemoveFromCartComponent from './RemoveFromCartComponent';

interface CartItemProps {
  item: {
    image: {
      path: string;
    };
    name: string;
    price: number;
    quantity: number;
    count: number;
    productID :any
  };
  orderCreated?: boolean;
  removeFromCartHandler (a:any,b:any,c:any) : any
  changeCount(a:any, b:any) : void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  orderCreated = false,
  removeFromCartHandler,
  changeCount,
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={item.image ? item.image.path ?? null : undefined}
              fluid
            />
          </Col>
          <Col md={2}>{item.name}</Col>
          <Col md={2}>
            <b>${item.price}</b>
          </Col>
          <Col md={3}>
            <Form.Select
              onChange={
                changeCount
                  ? (e) => changeCount(item.productID, e.target.value)
                  : undefined
              }
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productID={item.productID}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent

