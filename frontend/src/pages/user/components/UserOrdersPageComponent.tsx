import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type UserOrdersPageComponentProps = {
  getOrders(): Promise<any>
};
const UserOrdersPageComponent = ({ getOrders }: UserOrdersPageComponentProps) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((orders:any) => setOrders(orders))
      .catch((er:any) => console.log(er));
  }, []);

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order:any, idx:number) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>You</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <Link to={`/user/order-details/${order._id}`}>
                    go to order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrdersPageComponent;
