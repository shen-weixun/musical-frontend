import { Container, Row, Card, Button, Col } from "react-bootstrap";
import thumbnail1 from '../assets/french.jpg';
import thumbnail2 from '../assets/noodles.jpg';
import thumbnail3 from '../assets/drink.jpg';
import { useNavigate } from "react-router-dom";

function Landing() {
  let navigate = useNavigate();

  const routeChange1 = () => navigate("/mains");
  const routeChange2 = () => navigate("/appetizers");
  const routeChange3 = () => navigate("/alcohol");

  return (
    <>
     <div
    style={{
      backgroundColor: "#080808", 
      minHeight: "100vh",
      paddingTop: "50px",
      paddingBottom: "50px",
    }}
  >
      <Container>
        <Row>
          <Col style={{ padding: "30px" }}>
            <Card style={{ width: '18rem', height: "24rem", 
             backgroundColor: "rgba(14, 13, 13, 0.85)",
              color: "#fff",
              border: "none", }}>
              <Card.Img variant="top" src={thumbnail1} style={{ objectFit: "cover", height: "180px" }}/>
              <Card.Body>
              <Card.Title style={{ textAlign: "center", fontWeight: "bold" }}>Appetizers</Card.Title>
                <Button
                  variant="dark"
                  size="sm"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    width: "70px",
                    height: "35px",
                    borderRadius: "8px",
                    color: "#fff",
                    backgroundColor: "#d87d4a",
                    fontWeight: "bold"
                  }}
                  onClick={routeChange2}
                >
                  Shop
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ padding: "30px" }}>
            <Card style={{ width: '18rem', height: "24rem" ,backgroundColor: "rgba(14, 13, 13, 0.85)",
              color: "#fff",
              border: "none", }}>
              <Card.Img variant="top"  src={thumbnail2}  style={{ objectFit: "cover", height: "180px" }}/>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" , fontWeight: "bold" }}>Mains</Card.Title>
                <Button
                  variant="dark"
                    size="sm"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    width: "70px",
                    height: "35px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#d87d4a",
                    
                  }}
                  onClick={routeChange1}
                >
                  Shop
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ padding: "30px" }}>
            <Card style={{ width: '18rem', height: "24rem",backgroundColor: "rgba(14, 13, 13, 0.85)",
              color: "#fff",
              border: "none", }}>
              <Card.Img variant="top" src={thumbnail3} style={{ objectFit: "cover", height: "180px" }}/>
              <Card.Body>
                <Card.Title style={{ textAlign: "center"  , fontWeight: "bold"}}>Alcohol</Card.Title>
                <Button
                  variant="dark"
                  size="sm"
                  style={{
                    margin: "0 auto",
                    display: "block",
                    width: "70px",
                    height: "35px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#d87d4a",
                    
                  }}
                  onClick={routeChange3}
                >
                  Shop
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}

export default Landing;
