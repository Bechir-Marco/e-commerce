import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

type LoginPageComponentProps = {
  loginUserApiRequest(
    email: any,
    password: any,
    doNotLogout: any
  ): Promise<any>;
  reduxDispatch(action:any): any;
  setReduxUserState(action:any): any;
};
const LoginPageComponent: React.FC<LoginPageComponentProps> = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: '',
    error: '',
    loading: false,
  });
  useEffect(() => {}, [loginUserResponseState]);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;
    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ success: '', error: '', loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: '',
          });
          console.log(res.userLoggedIn);
          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }

          if (res.success === 'user logged in' && !res.userLoggedIn.isAdmin) {
            window.location.assign('/user'); 
          } else window.location.assign('/admin/orders');
        })
        .catch((er) => {
          console.log(er.response);
          setLoginUserResponseState((prevState) => ({
            ...prevState,
            error: er.response.data,
          }));
          navigate('/login')
          
        });
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't you have an account?
                <Link to={'/register'}> Register </Link>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ''
              )}
              Login
            </Button>
            <Alert
              show={
                loginUserResponseState &&
                loginUserResponseState.error === 'wrong credentials'
              }
              variant="danger"
            >
              Wrong credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
