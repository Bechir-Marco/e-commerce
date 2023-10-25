import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import AddedToCartMessageComponent from '../../components/AddedToCartMessageComponent';

import ImageZoom from 'js-image-zoom';
import { Key, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { useParams } from 'react-router-dom';

type ProductDetailsPageComponentProps = {
  addToCartReduxAction: (
    a: any,
    b: any
  ) => (dispatch: any, getState: any) => Promise<any>;
  reduxDispatch(action: any): any;
  getProductDetails(action: any): any;
  userInfo(action: any): any;
  writeReviewApiRequest(a: any, b: any): Promise<any>;
};


const ProductDetailsPageComponent = (
  {
    addToCartReduxAction,
    reduxDispatch,
    getProductDetails,
    userInfo,
    writeReviewApiRequest,
  }: ProductDetailsPageComponentProps
) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState<any>(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState<string | boolean>(
    false
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [productReviewed]);

  useEffect(() => {
    if (product.images) {
      const options = {
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };

      product.images.forEach((image: any, id: number) => {
        const imageElement = document.getElementById(`imageId${id + 1}`);
        if (imageElement) {
          new ImageZoom(imageElement, options);
        }
      });
    }
  }, [product.images]);

  useEffect(() => {
    getProductDetails(id)
      .then((data: any) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er: any) => setError(er.response ? er.response : er.response));
  }, [id, productReviewed]);

  const sendReviewHandler = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === 'review created') {
            setProductReviewed('You successfuly reviewed the page!');
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

   return (
     <>
       {/* <MetaComponent title={product.name} description={product.description} /> */}
       <Container>
         <AddedToCartMessageComponent
           showCartMessage={showCartMessage}
           setShowCartMessage={setShowCartMessage}
         />
         <Row className="mt-5">
           {loading ? (
             <h2>Loading product details ...</h2>
           ) : error ? (
             <h2>{error}</h2>
           ) : (
             <>
               <Col style={{ zIndex: 1 }} md={4}>
                 {product.images
                   ? product.images.map((image:any, id:any) => (
                       <div key={id}>
                         <div key={id} id={`imageId${id + 1}`}>
                           <Image
                             crossOrigin="anonymous"
                             fluid
                             src={`${image.path ?? null}`}
                           />
                         </div>
                         <br />
                       </div>
                     ))
                   : null}
               </Col>
               <Col md={8}>
                 <Row>
                   <Col md={8}>
                     <ListGroup variant="flush">
                       <ListGroup.Item>
                         <h1>{product.name}</h1>
                       </ListGroup.Item>
                       <ListGroup.Item>
                         <Rating
                           readonly
                           size={20}
                           initialValue={product.rating}
                         />{' '}
                         ({product.reviewsNumber})
                       </ListGroup.Item>
                       <ListGroup.Item>
                         Price <span className="fw-bold">${product.price}</span>
                       </ListGroup.Item>
                       <ListGroup.Item>{product.description}</ListGroup.Item>
                     </ListGroup>
                   </Col>
                   <Col md={4}>
                     <ListGroup>
                       <ListGroup.Item>
                         Status:{' '}
                         {product.count > 0 ? 'in stock' : 'out of stock'}
                       </ListGroup.Item>
                       <ListGroup.Item>
                         Price:{' '}
                         <span className="fw-bold">${product.price}</span>
                       </ListGroup.Item>
                       <ListGroup.Item>
                         Quantity:
                         <Form.Select
                           value={quantity}
                           onChange={(e) => setQuantity(e.target.value)}
                           size="lg"
                           aria-label="Default select example"
                         >
                           {[...Array(product.count).keys()].map((x) => (
                             <option key={x + 1} value={x + 1}>
                               {x + 1}
                             </option>
                           ))}
                         </Form.Select>
                       </ListGroup.Item>
                       <ListGroup.Item>
                         <Button onClick={addToCartHandler} variant="danger">
                           Add to cart
                         </Button>
                       </ListGroup.Item>
                     </ListGroup>
                   </Col>
                 </Row>
                 <Row>
                   <Col className="mt-5">
                     <h5>REVIEWS</h5>
                     <ListGroup variant="flush">
                       {product.reviews &&
                         product.reviews.map((review:any, idx:number) => (
                           <ListGroup.Item key={idx}>
                             {review.user.name} <br />
                             <Rating
                               readonly
                               size={20}
                               initialValue={review.rating}
                             />
                             <br />
                             {review.createdAt.substring(0, 10)} <br />
                             {review.comment}
                           </ListGroup.Item>
                         ))}
                       <div ref={messagesEndRef} />
                     </ListGroup>
                   </Col>
                 </Row>
                 <hr />
                 {!userInfo.name && (
                   <Alert variant="danger">Login first to write a review</Alert>
                 )}

                 <Form onSubmit={sendReviewHandler}>
                   <Form.Group
                     className="mb-3"
                     controlId="exampleForm.ControlInput1"
                   >
                     <Form.Label>Write a review</Form.Label>
                     <Form.Control
                       name="comment"
                       required
                       as="textarea"
                       disabled={!userInfo.name}
                       rows={3}
                     />
                   </Form.Group>
                   <Form.Select
                     name="rating"
                     required
                     disabled={!userInfo.name}
                     aria-label="Default select example"
                   >
                     <option value="">Your rating</option>
                     <option value="5">5 (very good)</option>
                     <option value="4">4 (good)</option>
                     <option value="3">3 (average)</option>
                     <option value="2">2 (bad)</option>
                     <option value="1">1 (awful)</option>
                   </Form.Select>
                   <Button
                     disabled={!userInfo.name}
                     type="submit"
                     className="mb-3 mt-3"
                     variant="primary"
                   >
                     Submit
                   </Button>{' '}
                   {productReviewed}
                 </Form>
               </Col>
             </>
           )}
         </Row>
       </Container>
     </>
   );
};

export default ProductDetailsPageComponent;
