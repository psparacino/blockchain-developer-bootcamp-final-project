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

            const userInteractionContractAddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            
              //Token Contract

              const ownerShipTokenContractAddress = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";
              const OwnerShipTokenContractObject = await new ethers.Contract(ownerShipTokenContractAddress, OwnershipToken.abi, signer);
              setOwnershipTokenContract(OwnerShipTokenContractObject);

        }

    },[]) 
    return {UserInteractionContract, OwnershipTokenContract};
}

export default useContractObjectRepo;


