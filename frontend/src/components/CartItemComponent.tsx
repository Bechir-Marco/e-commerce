import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";

interface CartItemProps {
  item?: {
    image?: {
      path?: string 
    };
    name?: string;
    price?: number;
    quantity?: number;
    count?: number;
  };
  orderCreated?: boolean;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  orderCreated = false,
}) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image crossOrigin="anonymous" src={item?.image?.path} fluid />
        </Col>
        <Col md={2}>{item?.name}</Col>
        <Col md={2}>
          <b>${item?.price}</b>
        </Col>
        <Col md={3}>
          <Form.Select
            onChange={() => {}}
            disabled={orderCreated}
            value={item?.quantity}
          >
            {[...Array(item?.count).keys()].map((x, idx) => (
              <option key={idx} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.confirm('Are you sure?')}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItemComponent

