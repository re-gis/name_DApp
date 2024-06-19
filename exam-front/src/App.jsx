import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import HelloWorld from "./contracts/HelloWorld.json";

function App() {
  const [name, setName] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [nameRetrieved, setNameRetrieved] = useState("");

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
      } else if (window.web3) {
        // Legacy dapp browsers...
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
      } else {
        console.error(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      const networkId = 5777; // Ganache network id
      const deployedNetwork = HelloWorld.networks[networkId];
      const contractAddress = "0x7b965ccf4949c03c7a0038dccc0444c4553b9a5e";
      if (deployedNetwork) {
        const contractInstance = new web3.eth.Contract(
          HelloWorld.abi,
          contractAddress
        );
        setContract(contractInstance);
      } else {
        console.error("Contract not deployed to the specified network");
      }
    }
  }, [web3]);

  const handleSetName = async () => {
    if (contract) {
      if (accounts.length === 0) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          setAccounts(accounts);
        } catch (error) {
          console.error("User denied account access");
          return;
        }
      }

      try {
        await contract.methods.setName(name).send({ from: accounts[0] });
        setName("");
        console.log("Successfully set the name...");
      } catch (error) {
        console.error("Error while setting the name: " + error);
      }
    }
  };

  const handleGetName = async () => {
    if (contract) {
      try {
        const nameRetrieved = await contract.methods
          .getName()
          .call({ from: accounts[0] });
        setNameRetrieved(nameRetrieved);
        console.log("Successfully retrieved the name...");
      } catch (error) {
        console.error("Error while getting the name: " + error);
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>HelloWorld and Name DApp</h1>
        </div>
        <div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit" onClick={handleSetName}>
              Set Name
            </button>
          </div>
          <div>
            <button onClick={handleGetName}>Get Name</button>
            {nameRetrieved == "" ? (
              <></>
            ) : (
              <>
                <span>{nameRetrieved}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
