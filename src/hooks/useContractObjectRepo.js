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

            const userInteractionContractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            
              //Token Contract

            const ownerShipTokenContractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
            const OwnerShipTokenContractObject = await new ethers.Contract(ownerShipTokenContractAddress, OwnershipToken.abi, signer);
            setOwnershipTokenContract(OwnerShipTokenContractObject);

        }

    },[]) 
    return {UserInteractionContract, OwnershipTokenContract};
}

export default useContractObjectRepo;


