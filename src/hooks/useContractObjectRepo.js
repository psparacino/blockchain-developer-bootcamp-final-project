import { useState, useEffect } from "react";

import { ethers } from 'ethers';



import UserInteraction from '../artifacts/contracts/UserInteraction.sol/UserInteraction.json';

import OwnershipToken from '../artifacts/contracts/OwnershipToken.sol/OwnershipToken.json';






const useContractObjectRepo = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);

    //const [RootContract, setRootContract] = useState('');
    
    const [UserInteractionContract, setUserInteractionContract] = useState('');

    const [OwnershipTokenContract, setOwnershipTokenContract] = useState('');
    
    

    //const [signer, setSigner] = useState('');

    //const [provider, setProvider] = useState('');

    useEffect(()=> {
        if (provider) {
            contractObjects();
          } else {
            alert("please connect to Metamask")
          }
        
        
          async function contractObjects() {

                     
            //User Interaction Contract + Root Contract

            // kovan main: 0x19bB16EeF743b0C7AE4B05076BC60236A1A0406d
            // kovan backup: 0xAEb592B687D576ba4d32173BF6b2ce03379f6743

            const userInteractionContractAddress = "0x19bB16EeF743b0C7AE4B05076BC60236A1A0406d";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            
            //Token Contract

            // kovan: 0xFbd6a8cbe3717e477082cc112F14F342a24d342c

            const ownerShipTokenContractAddress = "0xFbd6a8cbe3717e477082cc112F14F342a24d342c";
            const OwnerShipTokenContractObject = await new ethers.Contract(ownerShipTokenContractAddress, OwnershipToken.abi, signer);
            setOwnershipTokenContract(OwnerShipTokenContractObject);

        }

    },[]) 
    return {UserInteractionContract, OwnershipTokenContract};
}

export default useContractObjectRepo;


