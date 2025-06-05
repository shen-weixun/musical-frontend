import React, { useContext, useState } from "react";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";
import { ethers } from "ethers";
import { CartContext } from "./CartContext";

function Cart({ state }) {
    const { cartItems, clearCart } = useContext(CartContext);
    const { contract } = state;
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("您的購物車是空的！");
            return;
        }

        try {
            setIsLoading(true);
            setPaymentError("");
            setPaymentSuccess(false);

            if (!contract) {
                throw new Error("智能合約未連接！");
            }
            console.log("Cart items before checkout:", cartItems);
            cartItems.forEach((item, index) => {
                console.log(`Item ${index + 1}:`, item);
                console.log("Name:", item.name);
                console.log("Category:", item.category);
                console.log("Image URL:", item.imageURL);
                console.log("Description:", item.description);
                console.log("Price:", item.price);
                console.log("Quantity:", item.quantity);
            });
            // 遍歷購物車商品進行交易
            for (const item of cartItems) {
                const totalAmount = (parseFloat(item.price) * item.quantity).toString();
                const amount = { value: ethers.utils.parseEther(totalAmount) };

                const transaction = await contract.placeOrder(
                    item.name,
                    item.category,
                    item.imageURL,
                    item.description,
                    totalAmount,
                    amount
                );

                await transaction.wait();
            }

            setPaymentSuccess(true);
            clearCart();
            console.log("交易成功！");
        } catch (error) {
            console.error("交易失敗：", error);
            setPaymentError("交易失敗，請稍後重試。");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <h2>購物車</h2>
            {paymentSuccess && <Alert variant="success">交易成功！</Alert>}
            {paymentError && <Alert variant="danger">{paymentError}</Alert>}
            {cartItems.length === 0 ? (
                <Alert variant="warning">您的購物車是空的，快去選購商品吧！</Alert>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>商品名稱</th>
                                <th>單價 (ETH)</th>
                                <th>數量</th>
                                <th>小計 (ETH)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity).toFixed(4)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4">
                                    <strong>總計</strong>
                                </td>
                                <td>
                                    <strong>{totalPrice.toFixed(4)} ETH</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button
                        variant="success"
                        onClick={handleCheckout}
                        disabled={isLoading || cartItems.length === 0}
                    >
                        {isLoading ? <Spinner animation="border" size="sm" /> : "前往結帳"}
                    </Button>
                    <Button
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        onClick={clearCart}
                        disabled={isLoading}
                    >
                        清空購物車
                    </Button>
                </>
            )}
        </Container>
    );
}

export default Cart;
