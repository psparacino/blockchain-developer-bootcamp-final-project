import { useState, useEffect } from "react";

import { ethers } from 'ethers';



import UserInteraction from '../artifacts/contracts/UserInteraction.sol/UserInteraction.json';

import OwnershipToken from '../artifacts/contracts/OwnershipToken.sol/OwnershipToken.json';






const useContractObjectRepo = () => {
    
    
    

    //const [RootContract, setRootContract] = useState('');
    
    const [UserInteractionContract, setUserInteractionContract] = useState('');

    const [OwnershipTokenContract, setOwnershipTokenContract] = useState('');
    
    

    //const [signer, setSigner] = useState('');

    //const [provider, setProvider] = useState('');

    useEffect(()=> {
        if (window.ethereum) {
            contractObjects();
          } else {
            alert("please install Metamask")
          }
        
        
          async function contractObjects() {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(0);

                     
            //User Interaction Contract + Root Contract

            // kovan main: 0x83A71D391677f78BbED848b414635EdCE6e6E9b4

            // rinkeby main: 0xEf543579E6dc9c7C71C3dF6405C119799f25C676

            const userInteractionContractAddress = "0x83A71D391677f78BbED848b414635EdCE6e6E9b4";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            
            //Token Contract

            // kovan: 0xfea39ED3c5FeA0248ec1E7453726a0Cf0c4E6E06

            // rinkeby: 0xF6E1B285f2c0633e478A8b77acAF7b08C10C61C0

            const ownerShipTokenContractAddress = "0xfea39ED3c5FeA0248ec1E7453726a0Cf0c4E6E06";
            const OwnerShipTokenContractObject = await new ethers.Contract(ownerShipTokenContractAddress, OwnershipToken.abi, signer);
            setOwnershipTokenContract(OwnerShipTokenContractObject);

        }

    },[]) 
    return {UserInteractionContract, OwnershipTokenContract};
}

export default useContractObjectRepo;


