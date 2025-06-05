import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import Landing from './Landing';
import thumbnail3 from '../assets/restraunt.png';
import { useNavigate } from 'react-router-dom';



function Banner() {
    const navigate = useNavigate();

    const handleClick = () => {
    navigate('/menu');
};
    return ( 
        <>
        <Container fluid style={{"backgroundColor":"#000"}}>
            <Row className="justify-content-md-center">
                <Col md={6} lg={6}>
                <Image src={thumbnail3} />
                </Col>
                <Col md={6} lg={6} style={{
                    "margin":"0",
                    top:"50%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Row>
                    <h1 style={{color:"#ffff"}}>Welcome to Night Pour <br /> 一場為味蕾精心策劃的夜晚 <br /> 
                    <Button variant='dark' style={{backgroundColor:"#d87d4a"}}   onClick={handleClick}>See Menu</Button>
                    </h1>
                    </Row>
                
                </Col>
            </Row>
        </Container>
        <Landing />
        </>
     );
}

export default Banner;