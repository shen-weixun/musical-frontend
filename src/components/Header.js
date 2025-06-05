import { Navbar, Container, Button, Nav, Modal, ListGroup } from 'react-bootstrap';
import { React, useEffect, useState, Row } from "react";
import { useNavigate } from "react-router-dom";
import { formatEther } from 'ethers'; // 單獨導入 formatEther
import { FaShoppingCart } from 'react-icons/fa'; // 安裝 react-icons 並引入購物車圖標

function Header({ state, details }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(true);
  const [contractBalance, setContractBalance] = useState();

  const { contract } = state;

  const EtherscanURL = "https://sepolia.etherscan.io/address/" + details.contractAddress;

  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = `/orders`; 
    navigate(path);
    handleClose();
  };

  useEffect(() => {
    const contractBalance = async () => {
      const balance = await contract.getBalance();        
      console.log(formatEther(balance)); // 使用 formatEther
      setContractBalance(formatEther(balance)); // 使用 formatEther
    };
    contract && contractBalance();
  }, [contract]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setCurrency(response);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"> Night Pour</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "#E9A178" }}>Home</Nav.Link>
            <Nav.Link href="/about" style={{ color: "#E9A178" }}>About</Nav.Link>
          </Nav>
          <Nav.Link href="/cart" style={{ color: "#E9A178" }}>
            <FaShoppingCart style={{ marginRight: "5px" }} /> Cart
          </Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Address: <a href="#" onClick={handleShow} style={{ color: "#E9A178" }}>{details.accounts}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Wallet Address: <b>{details.accounts}</b></ListGroup.Item>
            <ListGroup.Item>Contract Address: <br /><a href={EtherscanURL} style={{ color: "#000" }}><b>{details.contractAddress}</b> </a></ListGroup.Item>
            <ListGroup.Item>Wallet Balance: <br /> <b>{details.balance} ETH</b></ListGroup.Item>
            <ListGroup.Item>Contract Balance: <br /> <b>{contractBalance} ETH</b></ListGroup.Item>
            <ListGroup.Item>ChainID: <br /><b>{details.chainId}</b></ListGroup.Item>
          </ListGroup>
          <Modal.Title style={{ marginTop: "30px", textAlign: "center" }}>Exchange Rate</Modal.Title>
          {loading ?       
            <h3>No Data</h3>
            :
            <ListGroup variant="flush">
              <ListGroup.Item>{currency[0].name} : <br /><b>{currency[0].current_price} USD</b></ListGroup.Item>
              <ListGroup.Item>{currency[1].name} : <br /> <b>{currency[1].current_price} USD</b></ListGroup.Item>
              <ListGroup.Item>{currency[2].name} : <br /><b>{currency[2].current_price} USD</b></ListGroup.Item>
            </ListGroup>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" style={{ backgroundColor: "#E9A178" }} onClick={routeChange}>
            Orders
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;