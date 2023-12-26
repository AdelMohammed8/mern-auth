import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUpdateMutation } from "../components/slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { addUserInfo } from "../components/slices/authSlice";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
console.log(userInfo._id)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [update, { isLoading }] = useUpdateMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match", { position: "top-center" });
    } else {
      try {
        const res = await update({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(addUserInfo({ ...res }));
        console.log(res);
        toast.success("profile updated", { position: "top-center" });
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    }
  };
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setEmail,userInfo.setName]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="card p-5">
          <h1> Update </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="enter name"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter Pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="ConfirmPpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Pass"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {isLoading && <Loader />}
            <Button variant="primary" className="mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
