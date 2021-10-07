/* import { useState , React } from 'react';
import './Button.css';

import { ethers } from 'ethers';

let connected = false;


if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener('ethereum#initialized', handleEthereum, {
      once: true,
    },
    alert("If you want those sweet tunes in your eardrums, please install MetaMask!"));
    setTimeout(handleEthereum, 3000); // 3 seconds
  }


  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log('MetaMask successfully detected!');
      connected = true;
      // Access the decentralized web!
    } else {
      console.log('Please install MetaMask');
    }
  }



const Button = () => {
  
  //fix double click logic
  //const [ metaMaskOpen, setMetaMaskOpen] = useState(false);
  //console.log(metaMaskOpen , "HERE")


  const connectToMetaMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts")
    .then((response) => {
        connected = true;

    })
    .catch((error) => {
        window.location.reload();
    });
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    }


    return (
        <div>
            <button className="button" id="connectButton" 
              onClick={connectToMetaMask}>

              {connected === true ? 'MetaMask is Connected!' : 'Click Here to Connect MetaMask'}
            </button>
        </div>
    )
}

export default Button;


*/

import { useState , React } from 'react';
import './Button.css';

import { ethers } from 'ethers';




//let connected = false;


const Button = ({mainAccount, setMainAccount}) => {
  //left over from before using props
  
  
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
    //console.log(mainAccount, "main account check")
    }


    return (
        <div>
            <button className="button" id="connectButton" 
              onClick={connectToMetaMask}>
              
              {mainAccount ? mainAccount : "Please connect to MetaMask!"}
              
            </button>
        </div>
    )
}

export default Button;
