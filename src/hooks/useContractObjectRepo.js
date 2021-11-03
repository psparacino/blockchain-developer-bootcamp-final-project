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

            const userInteractionContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            
              //Token Contract

              const ownerShipTokenContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
              const OwnerShipTokenContractObject = await new ethers.Contract(ownerShipTokenContractAddress, OwnershipToken.abi, signer);
              setOwnershipTokenContract(OwnerShipTokenContractObject);

        }

    },[]) 
    return {UserInteractionContract, OwnershipTokenContract};
}

export default useContractObjectRepo;


