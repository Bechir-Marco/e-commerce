import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
    Image
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { changeCategory, setAttributesTableWrapper, setValuesForAttrFromDbSelectForm } from "./utils/utils";

const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(2.7)",
};

type EditProductPageComponentProps = {
  categories: any;
  fetchProduct(id: any):any
  updateProductApiRequest(id: any, inputs: any): Promise<any>;
  reduxDispatch(actions: any): any;
  saveAttributeToCatDoc(
    key: any,
    val: any,
    categoryChoosen: any
  ): (dispatch: any, getState: any) => Promise<void>;
  imageDeleteHandler(imgHandle: any, id: any): Promise<any>;
  uploadImagesApiRequest(a: any, b: any): Promise<any>;
  uploadImagesCloudinaryApiRequest (a: any, b: any): any
};
const EditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
}: EditProductPageComponentProps) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [updateProductResponseState, setUpdateProductResponseState] = useState({
    message: '',
    error: '',
  });
  const [attributesFromDb, setAttributesFromDb] = useState([]); // for select lists
  const [attributesTable, setAttributesTable] = useState([]); // for html table
  const [categoryChoosen, setCategoryChoosen] = useState('Choose category');
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const attrVal = useRef<HTMLSelectElement>(null);
  const attrKey = useRef<HTMLSelectElement>(null);
  const createNewAttrKey = useRef<HTMLInputElement | null>(null);
  const createNewAttrVal = useRef<HTMLInputElement | null>(null);

  const { id } = useParams<{ id: string }>();


  const navigate = useNavigate();

 useEffect(() => {
   console.log('id from useParams:', id);

   fetchProduct(id)
     .then((product: any) => {
       console.log('Fetched product:', product);
       setProduct(product);
     })
     .catch((error: any) => console.error('Error fetching product:', error));
 }, [id, imageRemoved, imageUploaded]);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };

    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(Number(id), formInputs)
        .then((data) => {
          if (data.message === 'product updated') navigate('/admin/products');
        })
        .catch((er) =>
          setUpdateProductResponseState({
            error: er.response,
            message: er.response,
          })
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item: any) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split('/')[0];
      const mainCategoryOfEditedProductAllData = categories.find(
        (categoryOfEditedProduct: any) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAllData &&
        mainCategoryOfEditedProductAllData.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAllData.attrs);
      }
    }
    setCategoryChoosen(product.category);
    setAttributesTable(product.attrs);
  }, [product]);

  const attributeValueSelected = (e: any) => {
    if (attrKey.current && e.target.value !== 'Choose attribute value') {
      setAttributesTableWrapper(
        attrKey.current.value,
        e.target.value,
        setAttributesTable
      );
    }
  };

  const deleteAttribute = (key: any) => {
    setAttributesTable((table) =>
      table.filter((item: any) => item.key !== key)
    );
  };

  const checkKeyDown = (e: any) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const newAttrKeyHandler = (e: any) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    addNewAttributeManually(e);
  };

  const newAttrValueHandler = (e: any) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    addNewAttributeManually(e);
  };

  const addNewAttributeManually = (e: any) => {
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChoosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue, setAttributesTable);
        e.target.value = '';
        if (createNewAttrKey?.current) {
          createNewAttrKey.current.value = '';
        }

        if (createNewAttrVal?.current) {
          createNewAttrVal.current.value = '';
        }

        setNewAttrKey(false);
        setNewAttrValue(false);
      }
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                onChange={(e) =>
                  changeCategory(
                    e,
                    categories,
                    setAttributesFromDb,
                    setCategoryChoosen
                  )
                }
              >
                <option value="Choose category">Choose category</option>
                {categories.map((category: any, idx: any) => {
                  return product.category === category.name ? (
                    <option selected key={idx} value={category.name}>
                      {category.name}
                    </option>
                  ) : (
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            {attributesFromDb.length > 0 && (
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={(e) =>
                        setValuesForAttrFromDbSelectForm(
                          e,
                          attrVal,
                          attributesFromDb
                        )
                      }
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item: any, idx: any) => (
                        <Fragment key={idx}>
                          <option value={item.key}>{item.key}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Row>
              {attributesTable && attributesTable.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item: any, idx: any) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttribute(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={categoryChoosen === 'Choose category'}
                    placeholder="first choose or create category"
                    name="newAttrKey"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                    required={newAttrValue}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    ref={createNewAttrVal}
                    disabled={categoryChoosen === 'Choose category'}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={newAttrKey && newAttrValue} variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images &&
                  product.images.map((image: any, idx: any) => (
                    <Col key={idx} style={{ position: 'relative' }} xs={3}>
                      <Image
                        crossOrigin="anonymous"
                        src={image.path ?? null}
                        fluid
                      />
                      <i
                        style={onHover as React.CSSProperties}
                        onClick={() =>
                          imageDeleteHandler(image.path, id).then((data: any) =>
                            setImageRemoved(!imageRemoved)
                          )
                        }
                        className="bi bi-x text-danger"
                      ></i>
                    </Col>
                  ))}
              </Row>
              <Form.Control
                type="file"
                multiple
                onChange={(e:any) => {
                  setIsUploading('upload files in progress ...');
                  if (process.env.NODE_ENV !== 'production') {
                    // to do: change to !==
                    uploadImagesApiRequest(e.target.files, id)
                      .then((data) => {
                        setIsUploading('upload file completed');
                        setImageUploaded(!imageUploaded);
                      })
                      .catch((er: any) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      );
                  } else {
                    uploadImagesCloudinaryApiRequest(e.target.files, id);
                    setIsUploading(
                      'upload file completed. wait for the result take effect, refresh also if neccassry'
                    );
                    setTimeout(() => {
                      setImageUploaded(!imageUploaded);
                    }, 5000);
                  }
                }}
              />
              {isUploading}
            </Form.Group>
            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            {updateProductResponseState.error ?? ''}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProductPageComponent;

