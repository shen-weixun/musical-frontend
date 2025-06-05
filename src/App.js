import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MenuPage from "./components/Menu";
import { useState, useEffect } from "react";
import abi from "./abi/music.json";
import { ethers, utils } from "ethers";
import Mains from "./components/mains";
import Appetizers from "./components/appetizers";
import Alcohol from "./components/alcohol";
import Orders from "./components/Orders";
import About from "./components/About";
import Cart from "./components/cart";
import { useContext } from "react";
import { CartContext } from "./components/CartContext";

function App() {

  const { cartItems } = useContext(CartContext);
  console.log("App level cart items:", cartItems); // 調試訊息

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [accountDetails, setAccountDetails] = useState({
    accounts: null,
    chainId: null,
    balance: null,
    contractAddress: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x45b218d83634f82A5b4e08305443ebd2F8D549aa";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setState({ provider, signer, contract });

          const { chainId } = await provider.getNetwork();
          let balance = await signer.getBalance();
          balance = utils.formatUnits(balance);
          setAccountDetails({ accounts, chainId, balance, contractAddress });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="App">
        <Header state={state} details={accountDetails} />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route exact path="/mains" element={<Mains state={state} />} />
          <Route exact path="/appetizers" element={<Appetizers state={state} />} />
          <Route exact path="/alcohol" element={<Alcohol state={state} />} />
          <Route exact path="/about" element={<About state={state} />} />
          <Route path="/cart" element={<Cart state={state} />} />
          <Route exact path="/orders" element={<Orders state={state} details={accountDetails} />} />
        </Routes>
    </div>
  );
}

export default App;
