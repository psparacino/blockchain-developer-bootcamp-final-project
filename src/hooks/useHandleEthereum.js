import { useState, useEffect } from "react";

import { ethers } from 'ethers';




const useHandleEthereum = () => {
    
    const [mainAccount, setMainAccount] = useState('');

    const [signer, setSigner] = useState('');

    const [provider, setProvider] = useState('');

    


    useEffect(()=> {
        if (window.ethereum) {
            handleEthereum();
          } else {
            window.addEventListener('ethereum#initialized', handleEthereum, {
              once: true,
            },
            alert("If you want those sweet tunes in your eardrums, please install MetaMask!"));
            setTimeout(handleEthereum, 3000); // 3 seconds
          }
        
        
          async function handleEthereum() {
            const { ethereum } = window;
            if (ethereum && ethereum.isMetaMask) {
              console.log('MetaMask successfully detected!');
        
        
              //Get Metamask info
              const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);
              // Prompt user for account connections
              await provider.send("eth_requestAccounts", []);
              const signer = await provider.getSigner(0);
                setSigner(signer);
              //check if MetaMask is open
              if (signer !== undefined) {
                await signer.getAddress()
                .then((response) => {
                  setMainAccount(response);

                })
        
            } else {
              console.log('Please install MetaMask');
            }
          }
        }

    },[])


      
        

        

    return {mainAccount, setMainAccount, signer, provider};
}

export default useHandleEthereum;


