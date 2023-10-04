import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type AddedToCartMessageProps = {
  showCartMessage : any
  setShowCartMessage :any
};
const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage,
}: AddedToCartMessageProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart!</Alert.Heading>
      <p>
        <Button variant="success" onClick={goBack}>
          Go back
        </Button>{' '}
        <Link to="/cart">
          <Button variant="danger">Go to cart</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;

