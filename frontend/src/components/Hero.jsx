import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-7 mt-3">
      <Container className="d-flex justify-content-center">
        <Card className="d-flex align-items-center  flex-column bg-light p-7 w-75">
          <h1 className="mb-4 text-center">Mern Authentication</h1>
          <p className="mb-4 text-center">
            Mern Authentication That shares JWT in in HTTP-only cookie,it also
            uses Redux Toolkit and the React Bootstrap Library{" "}
          </p>
          <div className="d-flex mb-2">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign in
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
