import { Button } from 'react-bootstrap';

interface RemoveFromCartComponentProps {
  productID: number;
  orderCreated?: boolean;
  quantity: number;
  price: number;
  removeFromCartHandler?: (
    productID: number,
    quantity: number,
    price: number
  ) => any;
}

const RemoveFromCartComponent = ({
  productID,
  orderCreated,
  quantity,
  price,
  removeFromCartHandler
}: RemoveFromCartComponentProps) => {
  return (
    <Button
      disabled={orderCreated}
      type="button"
      variant="secondary"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
      <i className="bi bi-trash"></i>
    </Button>
  );
};

export default RemoveFromCartComponent;
