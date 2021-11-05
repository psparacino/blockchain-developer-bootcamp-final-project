import { useState , React } from 'react';
import './MetaMaskButton.css';

import { ethers } from 'ethers';


const MetaMaskButton = ({mainAccount, setMainAccount}) => {
  
  
  //fix double click logic
  //const [ metaMaskOpen, setMetaMaskOpen] = useState(false);
  //console.log(metaMaskOpen , "HERE")


  const connectToMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts")
    .then((response) => {

    })
    .catch((error) => {
        window.location.reload();
    });
    const signer = provider.getSigner();
    await signer.getAddress()
    .then((response) => {
      setMainAccount(response);
    })
    }
    

    //address abbreviation
    const cleanedMainAccount = mainAccount.slice(0,6) + "..." + mainAccount.substr(-4);
    


    return (
        <div>
            <button className="button" id="connectButton" 
              onClick={connectToMetaMask}>
              
              {mainAccount ? "METAMASK IS CONNECTED : " + cleanedMainAccount : "Please connect to MetaMask!"}
              
            </button>
        </div>
    )
}

export default MetaMaskButton;
