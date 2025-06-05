import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import mains from "../Utils/Mains.json";
import { React, useState, useContext } from 'react';
import { ethers } from 'ethers';
import { CartContext } from "./CartContext"; // 引入購物車 Context
function Mains({ state }) {
  const [isLoading, setIsLoading] = useState(false);
     const [showAlert, setShowAlert] = useState(false);
     const [errorMessage, setErrorMessage] = useState(""); // 用於顯示錯誤訊息
     const [currentProduct, setCurrentProduct] = useState("");
     const [quantities, setQuantities] = useState({}); // 存儲每個商品的數量
     const [cartMessage, setCartMessage] = useState(""); // 購物車操作訊息
     const { addToCart } = useContext(CartContext); // 使用購物車 Context
     const { contract } = state; // 來自智能合約的連接狀態
 
     const handleQuantityChange = (number, value) => {
      const qty = parseInt(value, 10);
      if (!isNaN(qty) && qty >= 1) {
          setQuantities((prev) => ({ ...prev, [number]: qty }));
      } else {
          setQuantities((prev) => ({ ...prev, [number]: "" }));
      }
  };
    const buy = async (number) => {
        const index = number - 1;
        const product = mains[index];
        const quantity = quantities[number] || 1;

        setCurrentProduct(`${product.name} x ${quantity}`);
        setIsLoading(true);

        const totalPrice = (parseFloat(product.price) * quantity).toString();
        const amount = { value: ethers.utils.parseEther(totalPrice) };

        try {
            const transaction = await contract.placeOrder(
                product.name,
                product.category,
                product.imageURL,
                product.description,
                totalPrice,
                amount
            );
            await transaction.wait();
            console.log("Transaction completed");
            setShowAlert(true);
        } catch (error) {
            console.error("Transaction failed:", error);
        }

        setIsLoading(false);
    };

    // 加入購物車
     const handleAddToCart = (product, quantity) => {
      addToCart(product, quantity); // 加入購物車 Context
      setCartMessage(`${product.name} x ${quantity} 已加入購物車！`);
      setTimeout(() => setCartMessage(""), 3000); // 3 秒後清除訊息
  };

    return (
        <Container style={{ marginTop: "50px" }}>
            {currentProduct && isLoading && (
                <Alert variant="info">
                    正在購買商品：<strong>{currentProduct}</strong>，請稍候...
                </Alert>
            )}

            <Alert
                variant="success"
                show={showAlert}
                onClose={() => setShowAlert(false)}
                dismissible
            >
                成功購買：<strong>{currentProduct}</strong>
            </Alert>
             {/* 購物車提示訊息 */}
                                         {cartMessage && (
                                             <Alert variant="success" dismissible onClose={() => setCartMessage("")}>
                                                 {cartMessage}
                                             </Alert>
                                         )}
                             
                                         {/* 購買失敗提示 */}
                                         {errorMessage && (
                                             <Alert variant="danger" dismissible onClose={() => setErrorMessage("")}>
                                                 {errorMessage}
                                             </Alert>
                                         )}
            {mains.map((product) => {
                const quantity = quantities[product.number] || 1;
                const total = (parseFloat(product.price) * quantity).toFixed(4);

                return (
                    <Row key={product.number} style={{ marginTop: "20px" }}>
                        <Col
                            style={{
                                margin: "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Card style={{ width: '35rem' }}>
                                <Card.Img
                                    variant="top"
                                    style={{ objectFit: "cover" }}
                                    src={product.imageURL}
                                />
                            </Card>
                        </Col>
                        <Col
                            style={{
                                margin: "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <span>
                                <h2 style={{ marginBottom: "15px" }}>{product.name}</h2>
                                {product.description}
                                <Form.Group style={{ marginTop: "10px" }}>
                                    <Form.Label>數量：</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        placeholder="輸入數量"
                                        value={quantities[product.number] || ""}
                                        onChange={(e) => handleQuantityChange(product.number, e.target.value)}
                                        style={{ width: "100px" }}
                                    />
                                </Form.Group>
                                <p style={{ marginTop: "10px" }}>
                                    單價：{product.price} ETH → 總價：<strong>{total} ETH</strong>
                                </p>

                                {isLoading ? (
                                    <Spinner animation="border" variant="warning" style={{ marginTop: "20px" }} />
                                ) : (
                                    <Button
                                        variant="light"
                                        size="lg"
                                        style={{ background: "#d87d4a", marginTop: "20px", color: "#fff" }}
                                        onClick={() => buy(product.number)}
                                    >
                                        購買
                                    </Button>
                                )}
                                   <Button
                                   variant="outline-dark"
                                   size="lg"
                                   style={{ marginLeft: "10px" }}
                                   onClick={() => handleAddToCart(product, quantity)}
                                  >
                                  加入購物車
                                  </Button>
                            </span>
                        </Col>
                    </Row>
                );
            })}
        </Container>
    );
}

export default Mains;
