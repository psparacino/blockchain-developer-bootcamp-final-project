import React from 'react';
import './Button.css';

import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';

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

      // Access the decentralized web!
    } else {
      console.log('Please install MetaMask');
    }
  }



const Button = () => {

  const connectToMetMask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
            <button className="button" id="connectButton" onClick={connectToMetMask}>{connected === true ? 'MetaMask is Connected!' : 'Click Here to Connect MetaMask'}</button>
        </div>
    )
}

export default Button;


/*
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then((response) => {
        document.getElementById("connectButton").innerText = "MetaMask connected!";
        connected = true;

    })
    .catch((error) => {
        window.location.reload();
    });*/