import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Col, Container, Row, Form, Button ,Spinner} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../components/slices/usersApiSlice";
import { addUserInfo } from "../components/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(addUserInfo({ ...res }));
      console.log(res)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="p-5 card">
          <h1>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter Pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {isLoading &&<Loader/>}
            <Button className="mt-3" variant="primary" type="submit">
              login
            </Button>
            <Row>
              <Col>
                New Customer? <Link to={"/register"}>Register</Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
